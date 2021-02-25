import { AppConfig } from 'src/config';
import { EntityBase, PaginationResponse, PaginationDto } from 'src/internal';
import { ID, SLUG } from 'src/internal';
import { FindOptionsUtils, Like, QueryBuilder, Repository, SelectQueryBuilder } from 'typeorm';
import { EntityDefaultBlueprint, RequestPayload } from 'src/internal';

export class DefaultRepository<T extends EntityBase> extends Repository<T> {
    public name: string = 'item'
    populate(query: SelectQueryBuilder<T>, payload: RequestPayload) {
        FindOptionsUtils.joinEagerRelations(query, query.alias, query.expressionMap.mainAlias!.metadata)
        return query
    }
    restrictions(query: SelectQueryBuilder<T>, payload: RequestPayload) {
        return query
    }
    orderBy(query: SelectQueryBuilder<T>, payload: RequestPayload) {
        const orderBy = payload.getOrderBy(this.name)
        query.orderBy({ [`${this.name}.sortOrder`]: 'DESC', ...orderBy })
        return query
    }
    async search({ value, field = 'locale.name' }: { value: string, field?: string }, payload: RequestPayload) {
        const localeId = payload.getLocale().id
        const query = this.createQueryBuilder(this.name)
            .leftJoinAndSelect(`${this.name}.locale`, 'locale')
            .where(`${field} like :value`, { value: `%${value}%`, })
            .andWhere('locale.localeId = :localeId', { localeId })
        this.populate(query, payload)
        this.restrictions(query, payload)
        return this.findMany(query, payload)
    }
    async findByName({ name }: { name: string }, payload: RequestPayload): Promise<T> {
        const localeId = payload.getLocale().id
        const query = this.createQueryBuilder(this.name)
            .leftJoinAndSelect(`${this.name}.locale`, 'locale')
            .where(`locale.name = :name`, { name })
            .andWhere('locale.localeId = :localeId', { localeId })
        this.populate(query, payload)
        return query.getOne()
    }

    async findById({ id, query }: { id: ID, query?: object }): Promise<T> {
        return await this.findOne({ ...query, where: { id } })
    }
    async findBySlug({ slug }: { slug: SLUG }): Promise<T> {
        return await this.findOne({ where: { slug } })
    }
    // With Object
    async findWithPagination(query: object, payload: RequestPayload): Promise<PaginationResponse<T>> {
        // return this.findMany(this.createQueryBuilder(this.name), payload)
        const pagination = payload.getPagination()
        const orderBy: any = payload.getOrderBy()
        const perPage = pagination.perPage
        const page = pagination.page
        const skip = perPage * page;

        const items = await this.find({ ...query, skip, take: perPage, order: { ...orderBy } })
        const totalItems = await this.count(query)
        const totalPages = Math.ceil(totalItems / Math.abs(perPage));
        return new PaginationResponse({
            items,
            info: {
                perPage,
                nowPage: page + 1,
                totalItems,
                totalPages: totalPages
            }
        })
    }
    // With Query Builder
    async findMany(query: SelectQueryBuilder<T>, payload: RequestPayload): Promise<PaginationResponse<T>> {

        const pagination = payload.getPagination()
        const perPage = pagination.perPage
        const page = pagination.page
        const skip = perPage * page;
        this.orderBy(query, payload)
        this.populate(query, payload)
        this.restrictions(query, payload)
        if (pagination.perPage > 0) {
            query.take(perPage).skip(skip)
        }
        const items = await query.getMany()
        const totalItems = await query.getCount()
        let totalPages = Math.ceil(totalItems / perPage);
        if (perPage < 0) {
            totalPages = 1
        }
        return new PaginationResponse({
            items,
            info: {
                perPage,
                nowPage: page + 1,
                totalItems,
                totalPages: totalPages
            }
        })
    }

    paginate(items: T[], payload: RequestPayload) {
        const pagination = payload.getPagination()
        const perPage = pagination.perPage
        const page = pagination.page
        const start = page * perPage
        const end = start + perPage
        const slicedItems = items.slice(start, end)
        const totalItems = items.length
        let totalPages = Math.ceil(totalItems / perPage)
        if (perPage < 0) totalPages = 1
        return new PaginationResponse({
            items: slicedItems,
            info: {
                perPage,
                nowPage: page + 1,
                totalItems,
                totalPages
            }
        })
    }
    async deleteById({ id }: { id: ID }) {
        return await this.delete(id)
    }
}


import { AppConfig } from 'src/config';
import { EntityBase, PaginationResponse, PaginationDto } from 'src/internal';
import { ID, SLUG } from 'src/internal';
import { FindOptionsUtils, QueryBuilder, Repository, SelectQueryBuilder } from 'typeorm';
import { EntityDefaultBlueprint, RequestPayload } from 'src/internal';

export class DefaultRepository<T extends EntityBase> extends Repository<T> {
    populate(query: SelectQueryBuilder<T>, requestPayload: RequestPayload) {
        FindOptionsUtils.joinEagerRelations(query, query.alias, query.expressionMap.mainAlias!.metadata)
        return query
    }
    async findByName({ name }: { name: string }): Promise<T> {
        return await this.findOne({ where: { name } })
    }

    async findById({ id, query }: { id: ID, query?: object }): Promise<T> {
        return await this.findOne({ ...query, where: { id } })
    }
    async findBySlug({ slug }: { slug: SLUG }): Promise<T> {
        return await this.findOne({ where: { slug } })
    }
    // With Object
    async findWithPagination(query: object, payload: RequestPayload): Promise<PaginationResponse<T>> {
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
    async findMany(queryBuilder: SelectQueryBuilder<T>, payload: RequestPayload): Promise<PaginationResponse<T>> {
        const pagination = payload.getPagination()
        const orderBy = payload.getOrderBy()
        const perPage = pagination.perPage
        const page = pagination.page
        const skip = perPage * page;
        queryBuilder.orderBy(orderBy)
        const items = await queryBuilder.take(perPage).skip(skip).getMany()
        const totalItems = await queryBuilder.getCount()
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


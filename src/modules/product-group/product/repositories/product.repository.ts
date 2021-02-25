import { RequestPayload, DefaultRepository, IAvailableFilters } from 'src/internal';
import { Attribute } from 'src/internal';
import { ID, SerializeGroup } from 'src/types';
import { EntityRepository, getRepository, SelectQueryBuilder } from 'typeorm';
import { Product } from '../entities/product.entity';
import { filterItems, getFilters } from "src/internal"
import { ProductFiltersResponse } from 'src/internal';
import { ProductName } from '../product.constants';
import { ProductStatus } from '../product.types';
import { ProductCategoryRepository } from '../../product-category/repositories/category.repository';
import { ProductCategory } from '../../product-category';
import { BadRequestException } from '@nestjs/common';
@EntityRepository(Product)
export class ProductRepository extends DefaultRepository<Product> {
    public name = ProductName

    QFindByCategoryId({ id }, payload: RequestPayload) {
        return this.createQueryBuilder(this.name)
            .leftJoinAndSelect(`${this.name}.category`, '_category')
            .where('_category.id = :id', { id })

    }

    restrictions(query: SelectQueryBuilder<Product>, payload: RequestPayload) {
        super.restrictions(query, payload)
        const groups = payload.getGroups()
        if (!groups.includes(SerializeGroup.Admin)) {
            query.andWhere(`${this.name}.status = :status`, { status: ProductStatus.Published })
        }
        return query
    }
    async findByCategoryId({ id }: { id: ID }, payload: RequestPayload) {
        const query = this.QFindByCategoryId({ id }, payload)
        return await this.findMany(query, payload)
    }
    async findSimilarItems({ id }: { id: ID }, payload: RequestPayload) {
        const item = await this.findById({ id })
        if(!item) throw new BadRequestException('Item with such id not found')
        const catIds = item.category.map(cat => cat.id)
        if(!catIds || catIds.length < 1)  catIds.push(-1)
        const query = this.createQueryBuilder(this.name)
            .leftJoinAndSelect(`${this.name}.category`, '_category')
            .where(`_category.id  IN (:...ids)`, { ids: catIds })
            .andWhere(`${this.name}.id <> :id`, {id})
        return this.findMany(query, payload)

    }
    async findWithFilters({ query, availableFilters }: { query: SelectQueryBuilder<Product>, availableFilters?: IAvailableFilters }, payload: RequestPayload) {
        this.populate(query, payload)
        this.orderBy(query, payload)
        this.restrictions(query, payload)

        let items = await query.getMany()
        const currency = payload.getCurrency()
        items = items.map(item => {
            item.transformCurrency(currency.id)
            return item
        })
        const filters = payload.getFilters()
        const filteredItems = filterItems(items, filters)
        const withPagination = this.paginate(filteredItems, payload)
        const filtersToSend = getFilters(filteredItems, availableFilters)
        return new ProductFiltersResponse({
            ...withPagination,
            filters: filtersToSend
        })
    }
    async findByCategoryIdWithFilters({ id }, payload: RequestPayload) {
        const query = this.QFindByCategoryId({ id }, payload)
        // can add available filters
        const categoryRepository = getRepository(ProductCategory)
        const category = await categoryRepository.findOne({ where: { id } })
        const availableFilters = {
            attributes: category.availableFilterAttributes,
            price: category.showFilterPrice
        }
        return this.findWithFilters({ query, availableFilters }, payload)
    }

    async findAllWithFilters({ }, payload: RequestPayload) {
        const query = this.createQueryBuilder(this.name)
        return this.findWithFilters({ query }, payload)
    }

}

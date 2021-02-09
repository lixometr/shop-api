import { RequestPayload, DefaultRepository } from 'src/internal';
import { Attribute } from 'src/internal';
import { ID } from 'src/types';
import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { Product } from '../entities/product.entity';
import { filterItems, getFilters } from "src/internal"
import { ProductFiltersResponse } from 'src/internal';
@EntityRepository(Product)
export class ProductRepository extends DefaultRepository<Product> {

    QFindByCategoryId({ id }, payload: RequestPayload) {
        return this.createQueryBuilder('product')
            .leftJoinAndSelect('product.category', 'category')
            .where('category.id = :id', { id })
    }
    async findByCategoryId({ id }: { id: ID }, payload: RequestPayload) {
        const query = this.QFindByCategoryId({ id }, payload)
        this.populate(query, payload)
        return await this.findMany(query, payload)
    }
    async findWithFilters({ query, availableFilters }: { query: SelectQueryBuilder<Product>, availableFilters?: Attribute[] }, payload: RequestPayload) {
        // const query = this.createQueryBuilder('product')
        //     .leftJoinAndSelect("product.attributes", "attribute")
        //     .leftJoinAndSelect('attribute.attr', 'attr')
        //     .leftJoinAndSelect('attribute.attrValues', 'attrValue')
        // .where('attr.slug = :attrSlug AND attrValue.slug IN (:...values)', {attrSlug: 'color', values: ['s']})
        const orderBy = payload.getOrderBy('product')
        this.populate(query, payload)
        query.orderBy({ sortOrder: 'DESC', ...orderBy })
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
        return this.findWithFilters({ query }, payload)
    }

    async findAllWithFilters({ }, payload: RequestPayload) {
        const query = this.createQueryBuilder('product')
        return this.findWithFilters({ query }, payload)
    }

}

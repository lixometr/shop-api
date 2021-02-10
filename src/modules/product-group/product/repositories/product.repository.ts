import { RequestPayload, DefaultRepository } from 'src/internal';
import { Attribute } from 'src/internal';
import { ID, SerializeGroup } from 'src/types';
import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { Product } from '../entities/product.entity';
import { filterItems, getFilters } from "src/internal"
import { ProductFiltersResponse } from 'src/internal';
import { ProductName } from '../product.constants';
import { ProductStatus } from '../product.types';
@EntityRepository(Product)
export class ProductRepository extends DefaultRepository<Product> {
    public name = ProductName
    QFindByCategoryId({ id }, payload: RequestPayload) {
        return this.createQueryBuilder(this.name)
            .leftJoinAndSelect(`${this.name}.category`, 'category')
            .where('category.id = :id', { id })

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
        this.populate(query, payload)
        return await this.findMany(query, payload)
    }
    async findWithFilters({ query, availableFilters }: { query: SelectQueryBuilder<Product>, availableFilters?: Attribute[] }, payload: RequestPayload) {
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
        return this.findWithFilters({ query }, payload)
    }

    async findAllWithFilters({ }, payload: RequestPayload) {
        const query = this.createQueryBuilder(this.name)
        return this.findWithFilters({ query }, payload)
    }

}

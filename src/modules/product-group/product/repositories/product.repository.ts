import {  RequestPayload, DefaultRepository } from 'src/internal';
import { Attribute } from 'src/internal';
import { ID } from 'src/types';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Product } from '../entities/product.entity';
import { filterItems, getFilters } from "../../../../helpers/product-filters/product-filters.helper"
import { ProductFiltersResponse } from '../../../../helpers/product-filters/product-filters.response';
@EntityRepository(Product)
export class ProductRepository extends DefaultRepository<Product> {
    async populate(query: SelectQueryBuilder<Product>, requestPayload: RequestPayload) {
        query
            .leftJoinAndSelect('product.tags', '_tags')
            .leftJoinAndSelect('product.locale', '_locale')
            .leftJoinAndSelect('product.category', '_category')
            .leftJoinAndSelect('product.attributes', '_attributes')
            .leftJoinAndSelect('_attributes.attr', '_attr')
            .leftJoinAndSelect('_attr.locale', '_attrLocale')
            .leftJoinAndSelect('_attributes.attrValues', '_attrValues')
            .leftJoinAndSelect('_attrValues.locale', '_attrValuesLocale')
        return query
    }
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
    async findWithFilters({query, availableFilters}: {query: SelectQueryBuilder<Product>, availableFilters?: Attribute[]}, payload: RequestPayload) {
        // const query = this.createQueryBuilder('product')
        //     .leftJoinAndSelect("product.attributes", "attribute")
        //     .leftJoinAndSelect('attribute.attr', 'attr')
        //     .leftJoinAndSelect('attribute.attrValues', 'attrValue')
        // .where('attr.slug = :attrSlug AND attrValue.slug IN (:...values)', {attrSlug: 'color', values: ['s']})
        this.populate(query, payload)
        const items = await query.getMany()
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
        return this.findWithFilters({query}, payload)
    }

    async findAllWithFilters({ }, payload: RequestPayload) {
        const query = this.createQueryBuilder('product')
        return this.findWithFilters({query}, payload)
    }

}

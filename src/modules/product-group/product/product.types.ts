import { ID, Product, Promocode } from "src/internal"

export enum ProductStatus {
    Published = 'published',
    Draft = 'draft',
    NotPublished = 'not-published'
}

export enum ProductType {
    simple = 'simple',
    variation = 'variation'
}

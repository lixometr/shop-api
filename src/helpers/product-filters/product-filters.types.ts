import { Attribute, AttributeValue } from "src/internal";
export interface AttributeFiltersValue extends AttributeValue {
    cnt: number
}
export interface AttributeFilters {
    attr: Attribute,
    attrValues: Array<AttributeFiltersValue>
}
export interface IAvailableFilters {
    attributes: Attribute[]
    price: boolean
}
// Pick<ProductAttribute, 'attr' | 'attrValues'>[]
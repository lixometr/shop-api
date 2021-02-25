import { IPagination } from "src/internal";
import { PaginationResponse } from "../index";
import { RequestPayload } from "src/internal";
import { ProductAttribute } from "src/internal";
import { Product } from "src/internal";
import { AttributeFilters } from "./product-filters.types";

interface ProductFilterseResponseDto extends IPagination<Product> {
    filters: {
        attributes: AttributeFilters[],
        price: [number, number]
    }
}

export class ProductFiltersResponse extends PaginationResponse<Product>{
    constructor(item: ProductFilterseResponseDto) {
        super(item)
        Object.assign(item)
    }
    serialize(payload: RequestPayload) {

        return super.serialize(payload)
    }
}
import { IPagination } from "src/internal";
import { PaginationResponse } from "../index";
import { EntityBaseMetadata } from "src/internal";
import { RequestPayload } from "src/internal";
import { ProductAttribute } from "src/internal";
import { Product } from "src/internal";

interface ProductFilterseResponseDto extends IPagination<Product>{
    filters: {
        attributes: Array<ProductAttribute>,
        price: [number, number]
    }
}

export class ProductFiltersResponse extends PaginationResponse<Product>{
    constructor(item: ProductFilterseResponseDto) {
        super(item)
        Object.assign(item)
    }
    serialize(metadata: EntityBaseMetadata, payload: RequestPayload) {
        
        return super.serialize(metadata, payload)
    }
}
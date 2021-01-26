import { ProductFiltersDto } from "src/internal";


export class ProductFilters {
    public price: [number, number]
    public attributes: {
        [key: string]: Array<string>
    }
    constructor(item: ProductFiltersDto) {
        Object.assign(this, item)
    }
    getFilters(): ProductFiltersDto {
        return {
            price: this.price,
            attributes: this.attributes
        }
    }
    getAttributes() {
        return this.attributes || {}
    }
    getPrice() {
        return this.price || []
    }

}
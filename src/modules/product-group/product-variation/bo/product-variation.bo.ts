import { ProductVariation } from "../entities/product-variation.entity";

export class ProductVariationBo {
    private variation: ProductVariation
    constructor({ variation }: { variation: ProductVariation }) {
        this.variation = variation
    }
    getPrice() {
        return this.variation.price
    }
    getTotalPrice() {
        return this.getPrice()
    }
}
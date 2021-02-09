import { ProductOption } from "../entities/product-option.entity";
import { ProductOptionCostTypes } from "../product-option.types";

export class ProductOptionBo {
    private option: ProductOption
    constructor({ option }: { option: ProductOption }) {
        this.option = option
    }
    getValues() {
        return this.option.values || []
    }
    getCostType() {
        return this.option.cost_type
    }
    getType() {
        return this.option.type
    }
    getPrice() {
        return this.getValues().reduce((optValueSum, optValue) => {
            const price = optValue.price || 0;
            return optValueSum + price
        }, 0)
    }
}
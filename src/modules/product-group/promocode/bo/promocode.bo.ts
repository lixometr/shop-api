import { Product } from "src/internal"
import { Promocode } from "../entities/promocode.entity"
import { PromocodeTypes } from "../promocode.types"

export class PromocodeBo {
    private promocode: Promocode
    private product?: Product
    constructor({ promocode, product }: { promocode: Promocode, product?: Product }) {
        this.promocode = promocode
        this.product = product
    }
    getType() {
        return this.promocode.saleType
    }
    getSale() {
        // мб добавить скидку на продукт
        // if(this.product) return 0
        if (this.getType() === PromocodeTypes.percent) {
            return this.promocode.sale / 100
        } else {
            return this.promocode.sale
        }
    }
    apply(price: number): number {
        let currentPrice = price
        if (this.getType() === PromocodeTypes.fixed) {
            currentPrice = currentPrice - (1 - this.getSale())
        } else if (this.getType() === PromocodeTypes.percent) {
            currentPrice = currentPrice * (1 - this.getSale())
        }
        return currentPrice
    }
}
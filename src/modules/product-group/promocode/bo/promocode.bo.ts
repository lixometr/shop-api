import { Product } from "src/internal"
import { Promocode } from "../entities/promocode.entity"
import { PromocodeTypes } from "../promocode.types"

export class PromocodeBo {
    private promocode: Promocode
    constructor({ promocode }: { promocode: Promocode }) {
        this.promocode = promocode
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
            currentPrice = currentPrice - this.getSale()
        } else if (this.getType() === PromocodeTypes.percent) {
            currentPrice = currentPrice * (1 - this.getSale())
        }
        if(currentPrice < 0) currentPrice = 0
        return currentPrice
    }
}
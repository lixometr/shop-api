import { Promocode } from "../entities/promocode.entity"

export class PromocodeBo {
    private promocode: Promocode
    constructor({promocode}) {
        this.promocode = promocode
    }
    getType() {
        return this.promocode.saleType
    }
    getSale() {
        
    }
}
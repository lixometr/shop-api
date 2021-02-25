import { ID, CartProductDto } from "src/internal"
import { ProductOptionBo } from "src/internal";
import { OrderProductItem } from "src/internal";
import { Product } from "../entities/product.entity"
import { ProductType } from "../product.types";
import * as _ from "lodash"
// type SerializedProduct = Product & { _isSerialized: true };


export class ProductBo {
    private product: Product | OrderProductItem
    private activeOptions: { [key: number]: Array<ID> }
    private cnt: number
    private activeVariation: ID
    constructor({ product, activeOptions, cnt, activeVariation }: CartProductDto) {
        this.product = product
        this.activeOptions = activeOptions || {}
        this.cnt = cnt
        this.activeVariation = activeVariation
    }
    getActiveVariation() {
        const idx = this.product.variations.findIndex(variation => variation.id === this.activeVariation)
        if (idx < 0) return null
        return this.product.variations[idx]
    }
    getPrice() {
        const type = this.getType()
        if (type === ProductType.simple || type === ProductType.kit) {
            return this.getProductPrice()
        } else if (type == ProductType.variation) {
            const variation = this.getActiveVariation()
            if (!variation) return this.getProductPrice()
            return variation.price
        }
    }
    getItem() {
        return this.product
    }
    getType() {
        return this.product.type
    }
    getProductPrice() {
        return this.product.price
    }
    getSale() {
        return this.product.sale / 100
    }
    // getPromocodeSale() {
    //     const promocodeBo = this.getPromocodeBo()
    //     if (!promocodeBo) return 0
    //     promocodeBo.getSale()
    // }
    getOptionsBo() {
        return this.product.options.map(option => new ProductOptionBo({ option }))
    }
    // getPromocodeBo() {
    //     if(!this.promocode) return null
    //     return new PromocodeBo({ product: this.product, promocode: this.promocode })
    // }
    getOptionsPrice() {
        const options = this.getOptionsBo().filter(optionBo => {
            const option = optionBo.getItem()
            if (!(option.id in this.activeOptions)) return false
            const optId = option.id
            option.values = option.values.filter(optionValue => {
                return this.activeOptions[optId].includes(optionValue.id)
            })
            return true
        })
        const optionsPrice = options.reduce((sum, option) => {
            return sum + option.getPrice()
        }, 0)
        return optionsPrice
    }
    getCnt() {
        return this.cnt
    }
    getCntSale() {
        return this.product.cntSale
    }
    applyCnt(price: number) {
        return price * this.getCnt()
    }
    applyOptions(price: number) {
        return price + this.getOptionsPrice()
    }
    applyCntSale(price: number) {
        const cnt = this.getCnt()
        const cntSaleValue = this.getCntSale()
        cntSaleValue.sort((a, b) => a.cnt - b.cnt)
        // [ { cnt: 1, sale: 10 }, { cnt: 5, sale: 20 } ]
        const cntSale = cntSaleValue.find((current, idx) => {
            if (current.cnt > cnt) return false
            const next = cntSaleValue[idx+1]
            if (next) {
                if(next.cnt < cnt) return false
            }
            return true
        })
        const sale = cntSale ? cntSale.sale / 100 : 1
        return price * sale
    }
    getTotalPrice(): number {
        let price = this.getPrice()
        let totalPrice = price
        totalPrice = this.applyCnt(totalPrice)
        totalPrice = this.applyCntSale(totalPrice)
        totalPrice = this.applyOptions(totalPrice)
        return totalPrice
    }
}


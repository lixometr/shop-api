import { from } from "rxjs"
import { map } from "rxjs/operators"
import { ID, CartProductDto } from "src/internal"
import { ProductOptionBo } from "src/internal";
import { OrderProductItem } from "src/internal";
import { Product } from "../entities/product.entity"
import { ProductType } from "../product.types";

// type SerializedProduct = Product & { _isSerialized: true };

export class ProductBo {
    private product: Product | OrderProductItem
    private activeOptions: { [key: number]: Array<ID> }
    private cnt: number
    private activeVariation: ID
    constructor({ product, activeOptions, cnt, activeVariation }: CartProductDto) {
        this.product = product
        this.activeOptions = activeOptions
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
        if (type === ProductType.simple) {
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
    getTotalPrice(): number {
        let totalPrice = 0
        let price = this.getPrice()
        from([price])
            .pipe(map(price => {
                return price * this.getCnt()
            }))
            .pipe(map(price => {
                return price * (1 - this.getSale())
            }))
            .pipe(map(price => {
                return price + this.getOptionsPrice()
            }))
            // .pipe(map(price => {
            //     return price * (1 - this.getPromocodeSale())
            // }))
            .subscribe(price => totalPrice = price)

        return totalPrice
    }
}
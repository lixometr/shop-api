import { from } from "rxjs"
import { map } from "rxjs/operators"
import { ID } from "src/internal"
import { ProductOptionBo } from "src/internal";
import { Product } from "../entities/product.entity"

type SerializedProduct = Product & { _isSerialized: true };

export class ProductBo {
    private product: Product
    private activeOptions: { [key: number]: Array<ID> }
    private cnt: number
    constructor({ product, activeOptions, cnt }: { product: SerializedProduct, activeOptions: { [key: number]: Array<ID> }, cnt: number }) {
        this.product = product
        this.activeOptions = activeOptions
        this.cnt = cnt
        // this.promocode = promocode
    }
    getPrice() {
        return this.product.price
    }
    getSale() {
        return this.product.sale
    }
    getPromocodeSale() {
        return 0.3
    }
    getOptionsPrice() {
        const options = this.product.options.filter(option => {
            if (!(option.id in this.activeOptions)) return false
            const optId = option.id
            option.values = option.values.filter(optionValue => {
                return this.activeOptions[optId].includes(optionValue.id)
            })
            return true
        })
        const optionsPrice = options.reduce((sum, option) => {
            return sum + new ProductOptionBo({ option }).getPrice()
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
                return price * 1 - this.getSale()
            }))
            .pipe(map(price => {
                return price + this.getOptionsPrice()
            }))
            .pipe(map(price => {
                return price * 1 - this.getPromocodeSale()
            }))
            .subscribe()


        return totalPrice
    }
}
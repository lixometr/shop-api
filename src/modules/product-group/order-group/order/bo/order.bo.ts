import { Order } from "../entities/order.entity";
import { ProductBo, PromocodeBo, CartBo } from "src/internal"
export class OrderBo {
    private order: Order
    constructor({ order }: { order: Order }) {
        this.order = order
    }
    getCartBo() {
        return new CartBo({ products: this.order.products, promocode: this.order.promocode })
    }
    getTotalPrice() {
        const cartBo = this.getCartBo()
        const productsPrice = cartBo.getTotalPrice()
        let totalPrice = productsPrice
        return totalPrice
    }
}
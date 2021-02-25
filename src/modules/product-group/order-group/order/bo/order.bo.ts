import { Order } from "../entities/order.entity";
import { ProductBo, PromocodeBo, CartBo, DeliveryBo } from "src/internal"
export class OrderBo {
    private order: Order
    constructor({ order }: { order: Order }) {
        this.order = order
    }
    getCartBo() {
        return new CartBo({ products: this.order.products, promocode: this.order.promocode })
    }
    getDeliveryBo() {
        return new DeliveryBo({delivery: this.order.delivery})
    }
    getTotalPrice() {
        const cartBo = this.getCartBo()
        const productsPrice = cartBo.getTotalPrice()
        const deliveryPrice = this.getDeliveryBo().getTotalPrice()
        let totalPrice = productsPrice
        totalPrice += deliveryPrice
        return totalPrice
    }
}
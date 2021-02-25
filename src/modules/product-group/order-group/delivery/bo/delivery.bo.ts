import { DeliveryBos } from "../delivery.types"
import { Delivery } from "../entities/delivery.entity"

export class DeliveryBo {
    private delivery: Delivery
    constructor({ delivery }: { delivery: Delivery }) {
        this.delivery = delivery
    }
    getType() {
        return this.delivery.type
    }
    getDeliveryBo() {
        const type = this.getType()
        const Model = DeliveryBos[type]
        return new Model({ delivery: this.delivery })
    }
    getTotalPrice() {
        const type = this.getType()
        const nowBo = this.getDeliveryBo()
        return nowBo.getTotalPrice()
    }
}
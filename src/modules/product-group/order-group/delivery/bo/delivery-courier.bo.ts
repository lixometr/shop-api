import { Delivery } from "../entities/delivery.entity"

export class DeliveryCourierBo {
    private delivery: Delivery
    constructor({ delivery }: {delivery: Delivery}) {
        this.delivery = delivery
    }
    getTotalPrice() {        
        return this.delivery.price || 0
    }
}
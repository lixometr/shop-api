import { Delivery } from "../entities/delivery.entity"

export class DeliveryPickupBo {
    private delivery: Delivery
    constructor({ delivery }: {delivery: Delivery}) {
        this.delivery = delivery
    }
    getTotalPrice() {        
        return 0 
    }
}
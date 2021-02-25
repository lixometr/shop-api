import { EntityBase } from "src/blueprints"
import { Order } from "src/internal"
interface IOrderResponse {
    payment: any,
    delivery: any,
    order: Order
}
export class OrderResponse extends EntityBase {
    public payment: any
    public delivery: any
    public order?: Order
    constructor(item: IOrderResponse) {
        super()
        Object.assign(this, item)
    }
}
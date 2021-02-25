import { DefaultRepository } from "src/blueprints";
import { EntityRepository } from "typeorm";
import { Order } from "../entities/order.entity";
import { OrderName } from "../order.constants";

@EntityRepository(Order)
export class OrderRepository extends DefaultRepository<Order>{
    public name = OrderName

    async findByOrderId({ orderId }) {
        return this.findOne({ where: { orderId } })
    }
}
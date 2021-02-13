import { DefaultRepository } from "src/blueprints";
import { EntityRepository } from "typeorm";
import { OrderDelivery } from "../entities/order-delivery.entity";

@EntityRepository(OrderDelivery)
export class OrderDeliveryRepository extends DefaultRepository<OrderDelivery> {

}
import { Module } from "@nestjs/common";
import { DeliveryModule } from "./delivery/delivery.module";
import { OrderModule } from "./order/order.module";
import { PaymentModule } from "./payment/payment.module";

@Module({
    imports: [OrderModule, DeliveryModule, PaymentModule]
})
export class OrderGroupModule {

}
import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { CreateOrderDto, EventName, PaymentEventName, PaymentName, RequestPayload } from "src/internal";
import { MailService } from "src/modules/mail/mail.service";
import { OrderName } from "./order.constants";
import { OrderService } from "./order.service";

@Injectable()
export class OrderListenersService {
    public name = OrderName
    constructor(private orderService: OrderService,) { }
    @OnEvent(`${OrderName}.${EventName.beforeCreate}`)
    async beforeCreate({ data, payload }: { data: CreateOrderDto, payload: RequestPayload }) {

    }

    @OnEvent(`${OrderName}.${EventName.afterCreate}`)
    async afterCreate({ data, payload }) {
       
    }

    @OnEvent(`${PaymentName}.${PaymentEventName.payed}`)
    async onOrderPayed({ orderId }) {

    }
    @OnEvent(`${PaymentName}.${PaymentEventName.error}`)
    async onOrderError({ orderId }) {
        await this.orderService.doPay({ orderId })
    }
}
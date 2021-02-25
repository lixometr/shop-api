import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "eventemitter2";
import { Delivery, RequestPayload } from "src/internal";
import { DeliveryName } from "../delivery.constants";

@Injectable()
export class DeliveryStrategy {
    public name = 'default'
    public delivery: Delivery
    constructor({ delivery }, public eventEmiter: EventEmitter2,) {
        this.delivery = delivery
    }
    getInfo() {
        return {
            id: this.delivery.id,
            type: this.delivery.type,
            price: this.delivery.price,
            address: this.delivery.address,
            deliveryTime: this.delivery.deliveryTime
        }
    }
    // Ответ после создания заказа
    async toResponse({ order }): Promise<any> {
        return
    }

    // При получении данных от внешнего апи (об успешной оплате/ошибке)
    async onResult({ data }, payload: RequestPayload) {
    }

}
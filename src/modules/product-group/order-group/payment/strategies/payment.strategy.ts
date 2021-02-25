import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "eventemitter2";
import { RequestPayload } from "src/internal";

import { PaymentName } from "../payment.constants";
import { PaymentService } from "../payment.service";
import { PaymentEventName } from "../payment.types";

@Injectable()
export class PaymentStrategy {
    public name = 'default'
    constructor(public paymentService: PaymentService, public eventEmiter: EventEmitter2, ) {

    }
    getInfo() {
        return {
            type: this.name
        }
    }
    // Ответ после создания заказа
    async toResponse({ order }): Promise<any> {
        return
    }

    // При получении данных от внешнего апи (об успешной оплате/ошибке)
    async onResult({ data }, payload: RequestPayload) {
        await this.eventEmiter.emitAsync(`${PaymentName}.${PaymentEventName.payed}`)
    }
    
}
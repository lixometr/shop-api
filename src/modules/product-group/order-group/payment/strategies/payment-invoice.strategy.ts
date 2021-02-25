import { Injectable } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { EventEmitter2 } from "eventemitter2";
import { GenerateInvoiceService } from "../generate-invoice.service";
import { PaymentService } from "../payment.service";
import { PaymentTypes } from "../payment.types";
import { PaymentStrategy } from "./payment.strategy";
@Injectable()
export class PaymentInvoiceStrategy extends PaymentStrategy {
    public name = PaymentTypes.invoice
    constructor(public paymentService: PaymentService, public eventEmiter: EventEmitter2, private invoiceService: GenerateInvoiceService, public moduleRef: ModuleRef) { super(paymentService, eventEmiter) }
    async toResponse({ order }) {
        // const test = this.moduleRef.get(GenerateInvoiceService)
        // console.log(test)
        // await this.invoiceService.generate({ order })
        return { ok: true }
    }
}
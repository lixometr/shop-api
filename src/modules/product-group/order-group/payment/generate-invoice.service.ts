import { Injectable } from "@nestjs/common";
import { Order } from "src/internal";

@Injectable()
export class GenerateInvoiceService {
    async generate({order}: {order: Order}) {
        console.log('test')
        console.log(order)
    }
}
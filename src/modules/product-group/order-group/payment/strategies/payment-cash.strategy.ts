import { Injectable } from "@nestjs/common";
import { PaymentTypes } from "../payment.types";
import { PaymentStrategy } from "./payment.strategy";

@Injectable()
export class PaymentCashStrategy extends PaymentStrategy {
    public name = PaymentTypes.cash
    
}
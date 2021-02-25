import { BadRequestException } from "@nestjs/common";
import { RequestPayload } from "src/internal";
import { Payment } from "../entities/payment.entity";
import { PaymentStrategyDefiner } from "./payment-strategy-definer";
import { PaymentStrategy } from "./payment.strategy";

export class PaymentContext {
    private strategy: PaymentStrategy
    constructor(strategy: PaymentStrategy | string) {
        if (typeof strategy === 'string') {
            const Strategy = new PaymentStrategyDefiner(strategy).getStrategy()
            if (Strategy) {
                this.strategy = new Strategy()
            }
        } else if (strategy instanceof PaymentStrategy) {
            this.strategy = strategy
        }

        if (!this.strategy) {
            throw new BadRequestException('Unknown payment strategy')
        }
    }

    async getInfo(): Promise<Payment> {
        return this.strategy.getInfo()
    }

    async toResponse({ order }) {
        return this.strategy.toResponse({ order })
    }
    async onResult({ data }, payload: RequestPayload) {
        return this.strategy.onResult({ data }, payload)
    }
}
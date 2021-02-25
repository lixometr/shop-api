import { PaymentStrategies } from "../payment.types"
import { PaymentStrategy } from "./payment.strategy"

export class PaymentStrategyDefiner {
    private strategy: string
    constructor(strategy: string) {
        this.strategy = strategy
    }

    getStrategy(): new (...args: any) => PaymentStrategy {
        return PaymentStrategies[this.strategy]
    }
}
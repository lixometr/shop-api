import { DeliveryStrategies } from "../delivery.types"
import { DeliveryStrategy } from "./delivery.strategy"

export class DeliveryStrategyDefiner {
    private strategy: string
    constructor(strategy: string) {
        this.strategy = strategy
    }

    getStrategy(): new (...args: any) => DeliveryStrategy {
        return DeliveryStrategies[this.strategy]
    }
}
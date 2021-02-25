import { BadRequestException } from "@nestjs/common";
import { Delivery, RequestPayload } from "src/internal";
import { DeliveryStrategyDefiner } from "./delivery-strategy-definer";
import { DeliveryStrategy } from "./delivery.strategy";

export class DeliveryContext {
    private strategy: DeliveryStrategy
    constructor({ delivery }: { delivery: Delivery }) {
        const strategy = delivery.type
        const Strategy = new DeliveryStrategyDefiner(strategy).getStrategy()
        if (Strategy) {
            this.strategy = new Strategy({ delivery })
        }


        if (!this.strategy) {
            throw new BadRequestException('Unknown delivery strategy')
        }
    }

    async getInfo(): Promise<any> {
        return this.strategy.getInfo()
    }

    async toResponse({ order }) {
        return this.strategy.toResponse({ order })
    }
    async onResult({ data }, payload: RequestPayload) {
        return this.strategy.onResult({ data }, payload)
    }
}
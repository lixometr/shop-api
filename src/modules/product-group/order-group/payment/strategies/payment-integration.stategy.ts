import { ID, Order, RequestPayload } from "src/internal";
import { PaymentStrategy } from "./payment.strategy";

export interface IStrategyOrder extends Order{
  
}
interface IPaymentIntegrationResponse {
    paymentUrl: string
}
export interface PaymentIntegrationStrategy {
    onResult({ data }: { data: any }, payload: RequestPayload): any
    generatePaymentLink({ order }: { order: IStrategyOrder }): Promise<string>
}
export class PaymentIntegrationStrategy extends PaymentStrategy {
    async toResponse({ order }): Promise<IPaymentIntegrationResponse> {
        const paymentUrl = await this.generatePaymentLink({ order })
        return { paymentUrl }
    }
}
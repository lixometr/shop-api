import { ID,  RequestPayload } from "src/internal";
import { DeliveryStrategy } from "./delivery.strategy";

export interface DeliveryIntegrationStrategy {
    onResult({ data }: { data: any }, payload: RequestPayload): any
}
export class DeliveryIntegrationStrategy extends DeliveryStrategy {
    async toResponse({ order }): Promise<any> {
      
    }
}
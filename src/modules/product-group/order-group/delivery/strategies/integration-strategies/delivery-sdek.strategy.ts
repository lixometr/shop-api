import { DeliveryIntegrationTypes } from "../../delivery.types";
import { DeliveryIntegrationStrategy } from "../delivery-integration.stategy";

export class DeliverySDEKStrategy extends DeliveryIntegrationStrategy {
    public name = DeliveryIntegrationTypes.sdek
}
import { Injectable } from "@nestjs/common";
import { DeliveryTypes } from "../delivery.types";
import { DeliveryStrategy } from "./delivery.strategy";

@Injectable()
export class DeliveryPickupStrategy extends DeliveryStrategy {
    public name = DeliveryTypes.pickup
    
}
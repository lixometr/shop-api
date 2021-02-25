import { Injectable } from "@nestjs/common";
import { DeliveryTypes } from "../delivery.types";
import { DeliveryStrategy } from "./delivery.strategy";
const pdf = require("pdf-creator-node")
@Injectable()
export class DeliveryCourierStrategy extends DeliveryStrategy{
    public name = DeliveryTypes.courier
    async toResponse({order}) {
        
    }
}
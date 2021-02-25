import { DeliveryCourierBo } from "./bo/delivery-courier.bo";
import { DeliveryIntegrationBo } from "./bo/delivery-integration.bo";
import { DeliveryPickupBo } from "./bo/delivery-pickup.bo";
import { DeliveryCourierStrategy } from "./strategies/delivery-courier.strategy";
import { DeliveryPickupStrategy } from "./strategies/delivery-pickup.strategy";
import { DeliverySDEKStrategy } from "./strategies/integration-strategies/delivery-sdek.strategy";

export enum DeliveryTypes {
    pickup = 'pickup',
    courier = 'courier',
    integraiton = 'integration'
}

export const DeliveryBos = {
    [DeliveryTypes.pickup]: DeliveryPickupBo,
    [DeliveryTypes.courier]: DeliveryCourierBo,
    [DeliveryTypes.integraiton]: DeliveryIntegrationBo
}

export enum DeliveryIntegrationTypes {
    sdek = 'sdek'
}
export const DeliveryIntegrationStrategies = {
    [DeliveryIntegrationTypes.sdek]: DeliverySDEKStrategy
}

export const DeliveryStrategies = {
    [DeliveryTypes.pickup]: DeliveryPickupStrategy,
    [DeliveryTypes.courier]: DeliveryCourierStrategy,

}
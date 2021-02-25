import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { ServiceBlueprint } from 'src/blueprints/service';
import { RequestPayload } from 'src/internal';
import { DeliveryName } from './delivery.constants';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery } from './entities/delivery.entity';
import { DeliveryRepository } from './repositories/delivery.repository';
import { DeliveryContext } from './strategies/delivery-context';

@Injectable()
export class DeliveryService extends ServiceBlueprint<Delivery>{
    public name = DeliveryName
    constructor(private deliveryRepository: DeliveryRepository, private eventEmiter: EventEmitter2) { super(deliveryRepository, eventEmiter) }
    getContext({  delivery }: {  delivery: Delivery }, payload: RequestPayload) {
        return new DeliveryContext({ delivery })
    }
    async findAvailable({ }, payload: RequestPayload) {
        return this.deliveryRepository.findAvailable({}, payload)
    }
    async findByType({ type }, payload: RequestPayload) {
        return this.deliveryRepository.findByType({ type }, payload)
    }
}

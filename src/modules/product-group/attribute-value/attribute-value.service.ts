import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { ID, RequestPayload } from 'src/internal';
import { AttributeValueName } from './attribute-value.constants';
import { AttributeValue } from './entities/attribute-value.entity';
import { AttributeValueRepository } from './repositories/attribute-value.repository';

@Injectable()
export class AttributeValueService extends ServiceBlueprint<AttributeValue>{
  public name = AttributeValueName
  constructor(private itemRepository: AttributeValueRepository, private eventEmiter: EventEmitter2) { super(itemRepository, eventEmiter) }

  findItemsByAttributeId({ id }: {id: ID}, requestPayload: RequestPayload) {
    return this.itemRepository.findItemsByAttributeId({ id }, requestPayload)
  }
}

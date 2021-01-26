import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { AttributeValue } from './entities/attribute-value.entity';
import { AttributeValueRepository } from './repositories/attribute-value.repository';

@Injectable()
export class AttributeValueService extends ServiceBlueprint<AttributeValue>{
  public name = 'attributeValue'
  constructor(private itemRepository: AttributeValueRepository, private eventEmiter: EventEmitter2) { super(itemRepository, eventEmiter) }
}

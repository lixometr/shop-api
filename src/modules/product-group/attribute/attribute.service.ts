import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { AttributeValue } from 'src/internal';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { AttributeRepository } from './repositories/attribute.repository';

@Injectable()
export class AttributeService extends ServiceBlueprint<AttributeValue> {
  public name = 'attribute'
  constructor(private itemRepository: AttributeRepository, private eventEmiter: EventEmitter2) { super(itemRepository, eventEmiter) }
}

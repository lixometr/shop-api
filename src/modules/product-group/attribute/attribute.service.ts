import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { RequestPayload } from 'src/helpers';
import { AttributeValue } from 'src/internal';
import { AttributeName } from './attribute.constants';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { AttributeRepository } from './repositories/attribute.repository';

@Injectable()
export class AttributeService extends ServiceBlueprint<AttributeValue> {
  public name = AttributeName
  constructor(private itemRepository: AttributeRepository, private eventEmiter: EventEmitter2) { super(itemRepository, eventEmiter) }

}

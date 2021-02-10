import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { CreatePromocodeDto } from './dto/create-promocode.dto';
import { UpdatePromocodeDto } from './dto/update-promocode.dto';
import { Promocode } from './entities/promocode.entity';
import { PromocodeName } from './promocode.constants';
import { PromocodeRepository } from './repositories/promocode.repository';

@Injectable()
export class PromocodeService extends ServiceBlueprint<Promocode> {
  public name = PromocodeName
  constructor(private readonly itemRepository: PromocodeRepository, private eventEmiter: EventEmitter2) { super(itemRepository, eventEmiter) }

}

import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { CurrencyName } from './currency.constants';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { Currency } from './entities/currency.entity';
import { CurrencyRepository } from './repositories/currency.repository';

@Injectable()
export class CurrencyService extends ServiceBlueprint<Currency> {
  public name = CurrencyName
  constructor(private itemRepository: CurrencyRepository, eventEmiter: EventEmitter2) {
    super(itemRepository, eventEmiter)
  }
}

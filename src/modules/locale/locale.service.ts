import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceBlueprint } from 'src/blueprints/service';
import { Locale } from 'src/internal';
import { CreateLocaleDto } from './dto/create-locale.dto';
import { UpdateLocaleDto } from './dto/update-locale.dto';
import { LocaleRepository } from './repositories/locale.repository';

@Injectable()
export class LocaleService extends ServiceBlueprint<Locale>{
  public name = 'locale'
  constructor(private localeRepository: LocaleRepository, private eventEmiter: EventEmitter2) {super(localeRepository, eventEmiter)}
}

import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceBlueprint } from 'src/blueprints/service';
import { Repository } from 'typeorm';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Settings } from "./entities/settings.entity"
import { SettingsRepository } from './repositories/settings.repository';
import { SettingsName } from './settings.constants';
@Injectable()
export class SettingsService extends ServiceBlueprint<Settings>{
  public name = SettingsName
  constructor(private settingsRepository: SettingsRepository, private eventEmiter: EventEmitter2) { super(settingsRepository, eventEmiter) }

}

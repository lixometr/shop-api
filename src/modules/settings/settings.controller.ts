import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { SettingsName } from './settings.constants';

@Controller('settings')
export class SettingsController extends ControllerBlueprint{
  public name = SettingsName
  constructor(private readonly settingsService: SettingsService) {super(settingsService)}

 
}

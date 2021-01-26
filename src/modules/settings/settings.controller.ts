import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';

@Controller('settings')
export class SettingsController extends ControllerBlueprint{
  constructor(private readonly settingsService: SettingsService) {super(settingsService)}

 
}

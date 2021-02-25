import { Controller, Get, Post, Body, Put, Param, Delete, SerializeOptions } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { SettingsName } from './settings.constants';
import { AuthAdmin, GetRequestPayload, ID, SerializeGroup, SLUG } from 'src/internal';
import { RequestPayload } from 'src/internal';

@Controller('settings')
export class SettingsController extends ControllerBlueprint {
  public name = SettingsName
  constructor(private readonly settingsService: SettingsService) { super(settingsService) }

  findAll() { return null }

  @Post()
  @AuthAdmin()
  create(@Body() data: CreateSettingDto, @GetRequestPayload() payload: RequestPayload) {
    return super.create(data, payload)
  }


  @SerializeOptions({groups: [SerializeGroup.Admin, SerializeGroup.AdminFull]})
  @AuthAdmin()
  @Put('/slug/:slug')
  updateBySlug(@Param('slug') slug: SLUG, @Body() data: UpdateSettingDto, @GetRequestPayload() payload: RequestPayload) {
    return this.settingsService.updateBySlug({ slug, data }, payload)
  }

  @SerializeOptions({groups: [SerializeGroup.Admin, SerializeGroup.AdminFull]})
  @AuthAdmin()
  @Put('/id/:id')
  updateById(@Param('id') id: ID, @Body() data: UpdateSettingDto, @GetRequestPayload() payload: RequestPayload) {
    return super.update(id, data, payload)
  }

}

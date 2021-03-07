import { Controller, Get, Post, Body, Put, Param, Delete, SerializeOptions } from '@nestjs/common';
import { WidgetService } from './widget.service';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { WidgetName } from './widget.constants';
import { SLUG, RequestPayload, GetRequestPayload, ID } from 'src/internal';
import { AuthAdmin } from 'src/decorators';
import { SerializeGroup } from 'src/types';
import { WidgetModelDto } from './models/widget.model.dto';

@Controller('widget')
export class WidgetController extends ControllerBlueprint {
  public name = WidgetName
  constructor(private readonly widgetService: WidgetService) { super(widgetService) }
  create() {
    return null
  }

  @AuthAdmin()
  @SerializeOptions({groups: [SerializeGroup.Admin, SerializeGroup.AdminFull]})
  @Put('/slug/:slug')
  updateBySlug(@Param('slug') slug: SLUG, @Body() data: any, @GetRequestPayload() payload: RequestPayload) {
    return this.widgetService.updateBySlug({ slug, data }, payload)
  }

  @AuthAdmin()
  @SerializeOptions({groups: [SerializeGroup.Admin, SerializeGroup.AdminFull]})
  @Put('/id/:id')
  updateById(@Param('id') id: ID, @Body() data, @GetRequestPayload() payload: RequestPayload) {
    return super.update(id, data, payload)
  }

}

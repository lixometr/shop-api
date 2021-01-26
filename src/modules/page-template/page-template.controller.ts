import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PageTemplateService } from './page-template.service';
import { CreatePageTemplateDto } from './dto/create-page-template.dto';
import { UpdatePageTemplateDto } from './dto/update-page-template.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { ID } from 'src/internal';
import { GetRequestPayload, RequestPayload } from 'src/internal';

@Controller('page-template')
export class PageTemplateController extends ControllerBlueprint {
  constructor(private readonly pageTemplateService: PageTemplateService) { super(pageTemplateService) }

  @Post()
  create(@Body() CreatePageTemplateDto: CreatePageTemplateDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.pageTemplateService.create({ data: CreatePageTemplateDto }, requestPayload);
  }

  @Put('id/:id')
  async update(@Param('id') id: ID, @Body() UpdatePageTemplateDto: UpdatePageTemplateDto, @GetRequestPayload() requestPayload: RequestPayload): Promise<any> {
    return this.pageTemplateService.updateById({ id, data: UpdatePageTemplateDto }, requestPayload);
  }

}

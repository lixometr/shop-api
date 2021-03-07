import { Controller, Get, Post, Body, Put, Param, Delete, SerializeOptions } from '@nestjs/common';
import { PageTemplateService } from './page-template.service';
import { CreatePageTemplateDto } from './dto/create-page-template.dto';
import { UpdatePageTemplateDto } from './dto/update-page-template.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { AuthAdmin, ID } from 'src/internal';
import { GetRequestPayload, RequestPayload } from 'src/internal';
import { PageTemplate } from './entities/page-template.entity';
import { PageTemplateName } from './page-template.constants';
import { SerializeGroup } from 'src/types';

@Controller('page-template')
export class PageTemplateController extends ControllerBlueprint {
  public name = PageTemplateName
  constructor(private readonly pageTemplateService: PageTemplateService) { super(pageTemplateService) }

  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  @AuthAdmin()
  @Post()
  create(@Body() CreatePageTemplateDto: CreatePageTemplateDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.pageTemplateService.create({ data: CreatePageTemplateDto }, requestPayload);
  }

  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  @AuthAdmin()
  @Put('id/:id')
  async update(@Param('id') id: ID, @Body() UpdatePageTemplateDto: UpdatePageTemplateDto, @GetRequestPayload() requestPayload: RequestPayload): Promise<any> {
    return this.pageTemplateService.updateById({ id, data: UpdatePageTemplateDto }, requestPayload);
  }

}

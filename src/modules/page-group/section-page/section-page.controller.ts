import { Controller, Get, Post, Body, Put, Param, Delete, SerializeOptions } from '@nestjs/common';
import { SectionPageService } from './section-page.service';
import { CreateSectionPageDto } from './dto/create-section-page.dto';
import { UpdateSectionPageDto } from './dto/update-section-page.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { AuthAdmin, ID, SerializeGroup } from 'src/internal';
import { GetRequestPayload, RequestPayload } from 'src/internal';
import { SectionPageName } from './section-page.constants';

@Controller('section-page')
export class SectionPageController extends ControllerBlueprint {
  public name = SectionPageName
  constructor(private readonly pageService: SectionPageService) { super(pageService) }

  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  @AuthAdmin()
  @Post()
  create(@Body() CreateSectionPageDto: CreateSectionPageDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.pageService.create({ data: CreateSectionPageDto }, requestPayload);
  }

  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  @AuthAdmin()
  @Put('id/:id')
  async update(@Param('id') id: ID, @Body() updateSectionPageDto: UpdateSectionPageDto, @GetRequestPayload() requestPayload: RequestPayload): Promise<any> {
    return super.update(id, updateSectionPageDto, requestPayload)
  }


}

import { Controller, Get, Post, Body, Put, Param, Delete, SerializeOptions } from '@nestjs/common';
import { SectionTagService } from './section-tag.service';
import { CreateSectionTagDto } from './dto/create-section-tag.dto';
import { UpdateSectionTagDto } from './dto/update-section-tag.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { AuthAdmin, ID, SerializeGroup } from 'src/internal';
import { GetRequestPayload, RequestPayload } from 'src/internal';
import { SectionTagName } from './section-tag.constants';

@Controller('section-tag')
export class SectionTagController extends ControllerBlueprint {
  public name = SectionTagName
  constructor(private readonly sectionTagService: SectionTagService) { super(sectionTagService) }

  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  @AuthAdmin()
  @Post()
  create(@Body() CreateSectionTagDto: CreateSectionTagDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.sectionTagService.create({ data: CreateSectionTagDto }, requestPayload);
  }

  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  @AuthAdmin()
  @Put('id/:id')
  async update(@Param('id') id: ID, @Body() updateSectionTagDto: UpdateSectionTagDto, @GetRequestPayload() requestPayload: RequestPayload): Promise<any> {
    return this.sectionTagService.updateById({ id, data: updateSectionTagDto }, requestPayload);
  }

}

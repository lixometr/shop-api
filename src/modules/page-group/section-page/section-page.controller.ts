import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SectionPageService } from './section-page.service';
import { CreateSectionPageDto } from './dto/create-section-page.dto';
import { UpdateSectionPageDto } from './dto/update-section-page.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { AuthAdmin, ID } from 'src/internal';
import { GetRequestPayload, RequestPayload } from 'src/internal';

@Controller('section-page')
export class SectionPageController extends ControllerBlueprint {
  constructor(private readonly pageService: SectionPageService) { super(pageService) }

  @AuthAdmin()
  @Post()
  create(@Body() CreateSectionPageDto: CreateSectionPageDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.pageService.create({ data: CreateSectionPageDto }, requestPayload);
  }

  @AuthAdmin()
  @Put('id/:id')
  async update(@Param('id') id: ID, @Body() updateSectionPageDto: UpdateSectionPageDto, @GetRequestPayload() requestPayload: RequestPayload): Promise<any> {
    return super.update(id, updateSectionPageDto, requestPayload)
  }

}

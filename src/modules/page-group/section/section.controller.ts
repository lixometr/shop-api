import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { AuthAdmin, ID } from 'src/internal';
import { GetRequestPayload, RequestPayload } from 'src/internal';
import { CreateSectionPageDto } from 'src/internal';
import { SectionPageService } from '../section-page/section-page.service';
import { SLUG } from 'src/types';
import { SectionName } from './section.constants';

@Controller('section')
export class SectionController extends ControllerBlueprint {
  public name = SectionName
  constructor(private readonly sectionService: SectionService, private sectionPageService: SectionPageService) { super(sectionService) }

  @AuthAdmin()
  @Post()
  create(@Body() createSectionDto: CreateSectionDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return super.create(createSectionDto, requestPayload);
  }

  @AuthAdmin()
  @Post('/id/:id/page')
  createPage(@Param('id') id: ID, @Body() createSectionPageDto: CreateSectionPageDto, @GetRequestPayload() requestPayload: RequestPayload) {
    createSectionPageDto.sectionId = id
    return this.sectionPageService.create({ data: createSectionPageDto }, requestPayload)
  }

  @Get('/id/:id/pages')
  findPagesById(@Param('id') id: ID, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.sectionService.findPagesById({ id }, requestPayload)
  }
  @Get('/slug/:slug/pages')
  findPagesBySlug(@Param('slug') slug: SLUG, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.sectionService.findPagesBySlug({ slug }, requestPayload)
  }

  @AuthAdmin()
  @Put('id/:id')
  async update(@Param('id') id: ID, @Body() updateSectionDto: UpdateSectionDto, @GetRequestPayload() requestPayload: RequestPayload): Promise<any> {
    return super.update(id, updateSectionDto, requestPayload)
  }

}

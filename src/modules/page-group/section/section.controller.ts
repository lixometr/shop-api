import { Controller, Get, Post, Body, Put, Param, Delete, SerializeOptions } from '@nestjs/common';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { AuthAdmin, ID } from 'src/internal';
import { GetRequestPayload, RequestPayload } from 'src/internal';
import { CreateSectionPageDto } from 'src/internal';
import { SectionPageService } from '../section-page/section-page.service';
import { SerializeGroup, SLUG } from 'src/types';
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
  @SerializeOptions({ groups: [SerializeGroup.Info, SerializeGroup.Translate] })
  @Post('/id/:id/page')
  createPage(@Param('id') id: ID, @Body() createSectionPageDto: CreateSectionPageDto, @GetRequestPayload() requestPayload: RequestPayload) {
    createSectionPageDto.sectionId = id
    return this.sectionPageService.create({ data: createSectionPageDto }, requestPayload)
  }

  @SerializeOptions({ groups: [SerializeGroup.Info, SerializeGroup.Translate] })
  @Get('/id/:id/pages')
  findPagesById(@Param('id') id: ID, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.sectionService.findPagesById({ id }, requestPayload)
  }

  @AuthAdmin()
  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminInfo, SerializeGroup.Translate] })
  @Get('/admin/id/:id/pages')
  findPagesByIdAdmin(@Param('id') id: ID, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.sectionService.findPagesById({ id }, requestPayload)
  }

  @AuthAdmin()
  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminInfo, SerializeGroup.Translate] })
  @Get('/id/:id/pages/search/:name')
  searchPagesById(@Param('id') id: ID, @Param('name') name: string, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.sectionService.searchPagesById({ id, name }, requestPayload)
  }

  @AuthAdmin()
  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminInfo, SerializeGroup.Translate] })
  @Get('/id/:id/pages/search/')
  searchAllPagesById(@Param('id') id: ID,  @GetRequestPayload() requestPayload: RequestPayload) {
    return this.sectionService.searchPagesById({ id, name: undefined }, requestPayload)
  }

  @SerializeOptions({ groups: [SerializeGroup.Info, SerializeGroup.Translate] })
  @Get('/slug/:slug/pages')
  findPagesBySlug(@Param('slug') slug: SLUG, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.sectionService.findPagesBySlug({ slug }, requestPayload)
  }

  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  @AuthAdmin()
  @Put('id/:id')
  async update(@Param('id') id: ID, @Body() updateSectionDto: UpdateSectionDto, @GetRequestPayload() requestPayload: RequestPayload): Promise<any> {
    return super.update(id, updateSectionDto, requestPayload)
  }

}

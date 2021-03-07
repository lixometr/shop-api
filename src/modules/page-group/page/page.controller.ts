import { Controller,  Post, Body, Put, Param, SerializeOptions } from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { AuthAdmin, ID, SerializeGroup } from 'src/internal';
import { GetRequestPayload, RequestPayload } from 'src/internal';
import { PageName } from './page.constants';

@Controller('page')
export class PageController extends ControllerBlueprint {
  public name = PageName
  constructor(private readonly pageService: PageService) { super(pageService) }

  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  @AuthAdmin()
  @Post()
  create(@Body() CreatePageDto: CreatePageDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.pageService.create({ data: CreatePageDto }, requestPayload);
  }

  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  @AuthAdmin()
  @Put('id/:id')
  async update(@Param('id') id: ID, @Body() updatePageDto: UpdatePageDto, @GetRequestPayload() requestPayload: RequestPayload): Promise<any> {
    return super.update(id, updatePageDto, requestPayload)
  }

}

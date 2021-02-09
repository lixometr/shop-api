import { Controller,  Post, Body, Put, Param } from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { AuthAdmin, ID } from 'src/internal';
import { GetRequestPayload, RequestPayload } from 'src/internal';

@Controller('page')
export class PageController extends ControllerBlueprint {
  constructor(private readonly pageService: PageService) { super(pageService) }

  @AuthAdmin()
  @Post()
  create(@Body() CreatePageDto: CreatePageDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.pageService.create({ data: CreatePageDto }, requestPayload);
  }

  @AuthAdmin()
  @Put('id/:id')
  async update(@Param('id') id: ID, @Body() updatePageDto: UpdatePageDto, @GetRequestPayload() requestPayload: RequestPayload): Promise<any> {
    return super.update(id, updatePageDto, requestPayload)
  }

}

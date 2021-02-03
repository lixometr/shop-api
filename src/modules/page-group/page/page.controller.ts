import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PageService } from './page.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { ID } from 'src/internal';
import { GetRequestPayload, RequestPayload } from 'src/internal';

@Controller('page')
export class PageController extends ControllerBlueprint {
  constructor(private readonly pageService: PageService) { super(pageService) }

  @Post()
  create(@Body() CreatePageDto: CreatePageDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.pageService.create({ data: CreatePageDto }, requestPayload);
  }

  @Put('id/:id')
  async update(@Param('id') id: ID, @Body() UpdatePageDto: UpdatePageDto, @GetRequestPayload() requestPayload: RequestPayload): Promise<any> {
    return this.pageService.updateById({ id, data: UpdatePageDto }, requestPayload);
  }

}

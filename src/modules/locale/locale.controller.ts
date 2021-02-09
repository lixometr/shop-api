import { Controller, Get, Post, Body, Put, Param, Delete, Req } from '@nestjs/common';
import { LocaleService } from './locale.service';
import { CreateLocaleDto } from './dto/create-locale.dto';
import { UpdateLocaleDto } from './dto/update-locale.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { AuthAdmin, ID, NoAuthRequest } from 'src/internal';
import { GetRequestPayload } from 'src/internal';
import { RequestPayload } from 'src/internal';

@Controller('locale')
export class LocaleController extends ControllerBlueprint {
  constructor(private readonly localeService: LocaleService) { super(localeService) }

  @AuthAdmin()
  @Post()
  async create(@Body() data: CreateLocaleDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return await super.create(data, requestPayload)
  }

  @AuthAdmin()
  @Put('id/:id')
  async update(@Param('id') id: ID, @Body() updateLocaleDto: UpdateLocaleDto, @GetRequestPayload() requestPayload: RequestPayload): Promise<any> {
    return super.update(id, updateLocaleDto, requestPayload)
  }
}

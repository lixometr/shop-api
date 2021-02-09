import { Controller, Get, Post, Body, Put, Param, Delete, SerializeOptions } from '@nestjs/common';
import { PromocodeService } from './promocode.service';
import { CreatePromocodeDto } from './dto/create-promocode.dto';
import { UpdatePromocodeDto } from './dto/update-promocode.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { AuthAdmin, GetRequestPayload, ID, RequestPayload, SerializeGroup } from 'src/internal';

@Controller('promocode')
export class PromocodeController extends ControllerBlueprint {
  constructor(private readonly promocodeService: PromocodeService) { super(promocodeService) }
  findBySlug() { return null }
  findBySlugAdmin() { return null }

  @SerializeOptions({ groups: [SerializeGroup.Full] })
  @AuthAdmin()
  @Post()
  async create(@Body() data: CreatePromocodeDto, @GetRequestPayload() payload: RequestPayload) {
    return this.promocodeService.create({ data }, payload)
  }
  @SerializeOptions({ groups: [SerializeGroup.Full] })
  @AuthAdmin()
  @Put('/id/:id')
  async update(@Param('id') id: ID, @Body() data: UpdatePromocodeDto, @GetRequestPayload() payload: RequestPayload) {
    return this.promocodeService.updateById({ data, id }, payload)
  }
}

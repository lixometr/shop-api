import { Controller, Get, Post, Body, Put, Param, Delete, SerializeOptions } from '@nestjs/common';
import { PromocodeService } from './promocode.service';
import { CreatePromocodeDto } from './dto/create-promocode.dto';
import { UpdatePromocodeDto } from './dto/update-promocode.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { AuthAdmin, GetRequestPayload, ID, RequestPayload, SerializeGroup } from 'src/internal';
import { PromocodeName } from './promocode.constants';

@Controller('promocode')
export class PromocodeController extends ControllerBlueprint {
  public name = PromocodeName
  constructor(private readonly promocodeService: PromocodeService) { super(promocodeService) }
  findBySlug() { return null }
  findBySlugAdmin() { return null }

  @SerializeOptions({ groups: [SerializeGroup.Full, SerializeGroup.Translate] })
  @Get('/name/:name')
  findByName(@Param('name') name: string, @GetRequestPayload() payload: RequestPayload) {
    return this.promocodeService.findByName({ name }, payload)
  }

  @SerializeOptions({ groups: [SerializeGroup.AdminFull, SerializeGroup.Admin] })
  @AuthAdmin()
  @Post()
  async create(@Body() data: CreatePromocodeDto, @GetRequestPayload() payload: RequestPayload) {
    return this.promocodeService.create({ data }, payload)
  }
  @SerializeOptions({ groups: [SerializeGroup.AdminFull, SerializeGroup.Admin] })
  @AuthAdmin()
  @Put('/id/:id')
  async update(@Param('id') id: ID, @Body() data: UpdatePromocodeDto, @GetRequestPayload() payload: RequestPayload) {
    return this.promocodeService.updateById({ data, id }, payload)
  }
}

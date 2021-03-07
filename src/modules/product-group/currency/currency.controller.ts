import { Controller, Get, Post, Body, Put, Param, Delete, SerializeOptions } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { AuthAdmin, GetRequestPayload, ID, RequestPayload, SerializeGroup } from 'src/internal';
import { CurrencyName } from './currency.constants';

@Controller('currency')
export class CurrencyController extends ControllerBlueprint{
  public name = CurrencyName
  constructor(private readonly itemService: CurrencyService) {super(itemService)}
  
  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  @AuthAdmin()
  @Post()
  async create(@Body() data: CreateCurrencyDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return super.create(data, requestPayload)
  }

  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  @AuthAdmin()
  @Put('id/:id')
  update(@Param('id') id: ID, @Body() updateDto: UpdateCurrencyDto) {
    return super.update(id, updateDto)
  }
}

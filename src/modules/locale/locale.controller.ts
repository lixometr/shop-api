import { Controller, Get, Post, Body, Put, Param, Delete, Req, SerializeOptions } from '@nestjs/common';
import { LocaleService } from './locale.service';
import { CreateLocaleDto } from './dto/create-locale.dto';
import { UpdateLocaleDto } from './dto/update-locale.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { AuthAdmin, ID, NoAuthRequest, SerializeGroup } from 'src/internal';
import { GetRequestPayload } from 'src/internal';
import { RequestPayload } from 'src/internal';
import { LocaleName } from './locale.constants';

@Controller('locale')
export class LocaleController extends ControllerBlueprint {
  public name = LocaleName
  constructor(private readonly localeService: LocaleService) { super(localeService) }

  @SerializeOptions({ groups: [SerializeGroup.Info, SerializeGroup.Translate] })
  @Get()
  async findAll(
    @GetRequestPayload() requestPayload?: RequestPayload,
  ): Promise<any> {
    return await this.localeService.findAll({}, requestPayload);
  }
  

  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  @AuthAdmin()
  @Post()
  async create(@Body() data: CreateLocaleDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return await super.create(data, requestPayload)
  }

  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  @AuthAdmin()
  @Put('id/:id')
  async update(@Param('id') id: ID, @Body() updateLocaleDto: UpdateLocaleDto, @GetRequestPayload() requestPayload: RequestPayload): Promise<any> {
    return super.update(id, updateLocaleDto, requestPayload)
  }
}

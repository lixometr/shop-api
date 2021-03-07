import { Controller, Get, Post, Body, Put, Param, Delete, SerializeOptions } from '@nestjs/common';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { AuthAdmin, GetRequestPayload, RequestPayload, SerializeGroup } from 'src/internal';
import { AttributeValueService } from '../attribute-value/attribute-value.service';
import { AttributeName } from './attribute.constants';
import { AttributeService } from './attribute.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';

@Controller('attribute')
export class AttributeController extends ControllerBlueprint {
  public name = AttributeName
  constructor(private readonly attributeService: AttributeService, private attributeValueService: AttributeValueService) { super(attributeService) }

  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  @AuthAdmin()
  @Post()
  async create(data: CreateAttributeDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return super.create(data, requestPayload)
  }

  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  @AuthAdmin()
  @Put('/id/:id')
  async update(@Param('id') id, data: UpdateAttributeDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return super.update(id, data, requestPayload)
  }

  @SerializeOptions({ groups: [SerializeGroup.Info, SerializeGroup.Translate] })
  @Get('/id/:id/values')
  async getValues(@Param('id') id, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.attributeValueService.findItemsByAttributeId({ id }, requestPayload)
  }
}

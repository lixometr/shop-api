import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { AuthAdmin, GetRequestPayload, RequestPayload } from 'src/internal';
import { AttributeValueService } from './attribute-value.service';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';

@Controller('attribute-value')
export class AttributeValueController extends ControllerBlueprint {
  constructor(private readonly attributeValueService: AttributeValueService) { super(attributeValueService) }


  @AuthAdmin()
  @Post()
  async create(data: CreateAttributeValueDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return super.create(data, requestPayload)
  }

  @AuthAdmin()
  @Put('/id/:id')
  async update(@Param('id') id, data: UpdateAttributeValueDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return super.update(id, data, requestPayload)
  }
}

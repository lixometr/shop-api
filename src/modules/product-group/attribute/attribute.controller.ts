import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { GetRequestPayload, RequestPayload } from 'src/internal';
import { AttributeService } from './attribute.service';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';

@Controller('attribute')
export class AttributeController extends ControllerBlueprint {
  constructor(private readonly attributeService: AttributeService) { super(attributeService) }
  @Post()
  async create(data: CreateAttributeDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return super.create(data, requestPayload)
  }

  @Put('/id/:id')
  async update(@Param('id') id, data: UpdateAttributeDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return super.update(id, data, requestPayload)
  }
}

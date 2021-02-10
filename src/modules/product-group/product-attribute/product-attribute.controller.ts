import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ProductAttributeService } from './product-attribute.service';
import { CreateProductAttributeDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { GetRequestPayload, RequestPayload } from 'src/internal';
import { AuthAdmin } from 'src/internal';
import { ProductAttributeName } from './product-attribute.constants';

@Controller('product-attribute')
export class ProductAttributeController extends ControllerBlueprint{
  public name = ProductAttributeName   
  constructor(private readonly productAttributeService: ProductAttributeService) {super(productAttributeService)}

  @AuthAdmin()
  @Post()
  async create(data: CreateProductAttributeDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return super.create(data, requestPayload)
  }

  @AuthAdmin()
  @Put('/id/:id')
  async update(@Param('id') id, data: UpdateProductAttributeDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return super.update(id, data, requestPayload)
  }

}

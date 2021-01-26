import { Controller, Get, Post, Body, Put, Param, Delete, ValidationPipe, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { Product } from './entities/product.entity';
import { GetRequestPayload, ID, RequestPayload } from 'src/internal';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController extends ControllerBlueprint {
  constructor(private readonly productService: ProductService) { super(productService) }

  @Get()
  findAll(@GetRequestPayload() requestPayload: RequestPayload) {
    return this.productService.findAllWithFilters({}, requestPayload)
  }
  @Post()
  async create(@Body() product: CreateProductDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return super.create(product, requestPayload)
  }
  @Put('id/:id')
  update(@Param('id') id: ID, @Body() updateDto: UpdateProductDto) {
    return super.update(id, updateDto)
  }

  // @Get('filters')
  // async findWithFilters(@GetRequestPayload() requestPayload: RequestPayload) {
  //   return this.productService.findWithFilters({}, requestPayload)
  // }

}

import { Controller, Get, Post, Body, Put, Param, Delete, SerializeOptions } from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';
import { GetRequestPayload, ID, RequestPayload } from 'src/internal';
import { AuthAdmin } from 'src/internal';
import { SerializeGroup } from 'src/types';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { ProductReviewName } from './product-review.constants';

@Controller('product-review')
export class ProductReviewController extends ControllerBlueprint{
  public name = ProductReviewName
  constructor(private readonly productReviewService: ProductReviewService) {super(productReviewService) }


  @SerializeOptions({ groups: [SerializeGroup.Full] })
  @AuthAdmin()
  @Post()
  async create(@Body() data: CreateProductReviewDto, @GetRequestPayload() payload: RequestPayload) {
    return this.productReviewService.create({ data }, payload)
  }
  @SerializeOptions({ groups: [SerializeGroup.Full] })
  @AuthAdmin()
  @Put('/id/:id')
  async update(@Param('id') id: ID, @Body() data: UpdateProductReviewDto, @GetRequestPayload() payload: RequestPayload) {
    return this.productReviewService.updateById({ data, id }, payload)
  }

  // @SerializeOptions({ groups: [SerializeGroup.Info] })
  // @AuthAdmin()
  // @Get()
  // async findAll(@GetRequestPayload() payload: RequestPayload) {
  //   return this.productReviewService.findAll({}, payload)
  // }

  // @SerializeOptions({ groups: [SerializeGroup.Full] })
  // @Get('id/:id')
  // findById(@Param('id') id: ID, @GetRequestPayload() payload: RequestPayload) {
  //   return this.productReviewService.findById({ id }, payload)
  // }

  

  // @AuthAdmin()
  // @Delete('/id/:id')
  // async delete(@Param('id') id: ID, @GetRequestPayload() payload: RequestPayload) {
  //   return this.productReviewService.removeById({ id }, payload)
  // }

  findBySlug() { return null }
  findBySlugAdmin() { return null }



}

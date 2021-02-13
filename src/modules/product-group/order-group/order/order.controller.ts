import { Controller, Get, Post, Body, Put, Param, Delete, SerializeOptions } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { OrderName } from './order.constants';
import { GetRequestPayload, ID } from 'src/internal';
import { RequestPayload } from 'src/internal';
import { AuthAdmin } from 'src/internal';
import { SerializeGroup } from 'src/types';
import { ToCreateOrderDto } from './dto/to-create-order.dto';

@Controller('order')
export class OrderController extends ControllerBlueprint {
  public name = OrderName
  constructor(private readonly orderService: OrderService) { super(orderService) }


  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  @AuthAdmin()
  @Post()
  create(@Body() data: CreateOrderDto, @GetRequestPayload() payload: RequestPayload) {
    return this.orderService.create({ data }, payload)
  }

  @AuthAdmin()
  @Post('make')
  make(@Body() data: ToCreateOrderDto, @GetRequestPayload() payload: RequestPayload) {
    return this.orderService.make({ data }, payload)
  }


  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  @AuthAdmin()
  @Put('/id/:id')
  update(@Param('id') id: ID, @Body() data: UpdateOrderDto, @GetRequestPayload() payload: RequestPayload) {
    return this.orderService.updateById({ data, id }, payload)
  }
}

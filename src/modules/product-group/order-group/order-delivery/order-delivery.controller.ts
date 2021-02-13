import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OrderDeliveryService } from './order-delivery.service';
import { CreateOrderDeliveryDto } from './dto/create-order-delivery.dto';
import { UpdateOrderDeliveryDto } from './dto/update-order-delivery.dto';

@Controller('order-delivery')
export class OrderDeliveryController {
  constructor(private readonly orderDeliveryService: OrderDeliveryService) {}

}

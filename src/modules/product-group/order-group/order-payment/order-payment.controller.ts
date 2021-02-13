import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { OrderPaymentService } from './order-payment.service';
import { CreateOrderPaymentDto } from './dto/create-order-payment.dto';
import { UpdateOrderPaymentDto } from './dto/update-order-payment.dto';

@Controller('order-payment')
export class OrderPaymentController {
  constructor(private readonly orderPaymentService: OrderPaymentService) {}

  
}

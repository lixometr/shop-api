import { Controller, Get, Post, Body, Put, Param, Delete, All } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { GetRequestPayload, RequestPayload } from 'src/internal';
import { PaymentIntegrationTypes } from './payment.types';
import { PaymentName } from './payment.constants';

@Controller('payment')
export class PaymentController {
  name = PaymentName
  constructor(private readonly paymentService: PaymentService) { }

  @Get('/type/:type')
  getPaymentType(@Param('type') type: string) {
    // after create order  (depend on strategy send link to payment or send email or smth like this)
  }

  @All('/type/:type/result')
  getPaymentResult(@Param('type') type: PaymentIntegrationTypes, @Body() data: any, @GetRequestPayload() payload: RequestPayload) {
    // receiving payment status webhook
    return this.paymentService.paymentResult({type, data}, payload)
    // here we change order status depend on data
  }


}

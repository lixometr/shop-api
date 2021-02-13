import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDeliveryDto } from './create-order-delivery.dto';

export class UpdateOrderDeliveryDto extends PartialType(CreateOrderDeliveryDto) {}

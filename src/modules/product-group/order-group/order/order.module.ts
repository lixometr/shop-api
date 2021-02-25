import { forwardRef, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderRepository } from './repositories/order.repository';
import { OrderListenersService } from './order.listeners';
import { PromocodeModule } from '../../promocode/promocode.module';
import { ProductModule } from '../../product/product.module';
import { PaymentModule } from '../payment/payment.module';
import { DeliveryModule } from '../delivery/delivery.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderRepository]), forwardRef(() => PromocodeModule), forwardRef(() => ProductModule), forwardRef(() => PaymentModule), forwardRef(() => DeliveryModule)],
  controllers: [OrderController],
  providers: [OrderService, OrderListenersService],
  exports: [OrderService]
})
export class OrderModule {}

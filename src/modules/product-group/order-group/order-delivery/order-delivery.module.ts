import { Module } from '@nestjs/common';
import { OrderDeliveryService } from './order-delivery.service';
import { OrderDeliveryController } from './order-delivery.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDeliveryRepository } from './repositories/order-delivery.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDeliveryRepository])],
  controllers: [OrderDeliveryController],
  providers: [OrderDeliveryService],
  exports: [OrderDeliveryService]
})
export class OrderDeliveryModule {}

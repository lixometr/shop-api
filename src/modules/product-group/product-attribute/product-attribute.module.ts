import { Module } from '@nestjs/common';
import { ProductAttributeService } from './product-attribute.service';
import { ProductAttributeController } from './product-attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAttributeRepository } from './repositories/product-attribute.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductAttributeRepository])],
  controllers: [ProductAttributeController],
  providers: [ProductAttributeService],
  exports: [ProductAttributeService]
})
export class ProductAttributeModule {}

import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import {TypeOrmModule} from "@nestjs/typeorm"
import { Product } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { ProductListenerService } from './product.listener';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])],
  controllers: [ ProductController],
  providers: [ProductService, ProductListenerService],
  exports: [ProductService]
})
export class ProductModule {}

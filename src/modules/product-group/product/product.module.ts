import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import {TypeOrmModule} from "@nestjs/typeorm"
import { ProductRepository } from './repositories/product.repository';
import { ProductListenersService } from './product.listeners';
import { ImageModule } from 'src/modules/upload-group/image/image.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository]), ImageModule],
  controllers: [ ProductController],
  providers: [ProductService, ProductListenersService],
  exports: [ProductService]
})
export class ProductModule {}

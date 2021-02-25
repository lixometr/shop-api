import { forwardRef, Module } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryController } from './product-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryRepository } from './repositories/category.repository';
import { ProductModule } from '../product/product.module';
import { ProductCategoryListenerService } from './product-category.listener';
import { ImageModule } from 'src/modules/upload-group/image/image.module';

@Module({
  imports: [forwardRef(() => ProductModule), TypeOrmModule.forFeature([ProductCategoryRepository]), ImageModule ],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService, ProductCategoryListenerService],
  exports: [ProductCategoryService]
})
export class ProductCategoryModule {}

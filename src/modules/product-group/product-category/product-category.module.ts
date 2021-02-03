import { forwardRef, Module } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryController } from './product-category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryRepository } from './repositories/category.repository';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [forwardRef(() => ProductModule), TypeOrmModule.forFeature([ProductCategoryRepository]) ],
  controllers: [ProductCategoryController],
  providers: [ProductCategoryService],
  exports: [ProductCategoryService]
})
export class ProductCategoryModule {}

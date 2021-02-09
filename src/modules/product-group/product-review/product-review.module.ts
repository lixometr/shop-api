import { Module } from '@nestjs/common';
import { ProductReviewService } from './product-review.service';
import { ProductReviewController } from './product-review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductReviewRepository } from './repositories/product-review.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductReviewRepository])],
  controllers: [ProductReviewController],
  providers: [ProductReviewService],
  exports: [ProductReviewService]
})
export class ProductReviewModule { }

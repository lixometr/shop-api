import { PartialType } from '@nestjs/mapped-types';
import { IsEnum, IsOptional } from 'class-validator';
import { ProductReviewStatus } from '../product-review.types';
import { CreateProductReviewDto } from './create-product-review.dto';

export class UpdateProductReviewDto extends PartialType(CreateProductReviewDto) {

    @IsOptional()
    @IsEnum(ProductReviewStatus)
    status: ProductReviewStatus
}

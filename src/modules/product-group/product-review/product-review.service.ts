import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';
import { ProductReview } from './entities/product-review.entity';
import { ProductReviewName } from './product-review.constants';
import { ProductReviewRepository } from './repositories/product-review.repository';

@Injectable()
export class ProductReviewService extends ServiceBlueprint<ProductReview>{
  public name = ProductReviewName
  constructor(private itemRepository: ProductReviewRepository, private eventEmiter: EventEmitter2) { super(itemRepository, eventEmiter) }
}

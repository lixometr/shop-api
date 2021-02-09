import { DefaultRepository } from "src/blueprints";
import { EntityRepository } from "typeorm";
import { ProductReview } from "../entities/product-review.entity";

@EntityRepository(ProductReview)
export class ProductReviewRepository extends DefaultRepository<ProductReview>{

}
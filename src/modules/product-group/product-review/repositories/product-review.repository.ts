import { DefaultRepository } from "src/blueprints";
import { EntityRepository } from "typeorm";
import { ProductReview } from "../entities/product-review.entity";
import { ProductReviewName } from "../product-review.constants";

@EntityRepository(ProductReview)
export class ProductReviewRepository extends DefaultRepository<ProductReview>{
    public name = ProductReviewName
}
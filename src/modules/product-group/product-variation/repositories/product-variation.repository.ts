import { DefaultRepository } from "src/internal";
import { EntityRepository } from "typeorm";
import { ProductVariation } from "../entities/product-variation.entity";

@EntityRepository(ProductVariation)
export class ProductVariationRepository extends DefaultRepository<ProductVariation>{

}
import { DefaultRepository } from 'src/blueprints/default.repository';
import { EntityRepository, Repository } from 'typeorm';
import { ProductTag } from '../entities/product-tag.entity';

@EntityRepository(ProductTag)
export class ProductTagRepository extends DefaultRepository<ProductTag> {
    
}

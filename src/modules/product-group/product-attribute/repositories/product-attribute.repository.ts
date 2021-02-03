import { DefaultRepository } from 'src/blueprints/default.repository';
import { EntityRepository, Repository } from 'typeorm';
import { ProductAttribute } from '../entities/product-attribute.entity';

@EntityRepository(ProductAttribute)
export class ProductAttributeRepository extends DefaultRepository<ProductAttribute> {
    
}

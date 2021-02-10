import { DefaultRepository } from 'src/blueprints/default.repository';
import { EntityRepository, Repository } from 'typeorm';
import { ProductAttribute } from '../entities/product-attribute.entity';
import { ProductAttributeName } from '../product-attribute.constants';

@EntityRepository(ProductAttribute)
export class ProductAttributeRepository extends DefaultRepository<ProductAttribute> {
    public name = ProductAttributeName
}

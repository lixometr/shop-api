import { DefaultRepository } from 'src/blueprints/default.repository';
import { EntityRepository, Repository } from 'typeorm';
import { ProductTag } from '../entities/product-tag.entity';
import { ProductTagName } from '../product-tag.constants';

@EntityRepository(ProductTag)
export class ProductTagRepository extends DefaultRepository<ProductTag> {
    public name = ProductTagName
}

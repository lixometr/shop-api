import { DefaultRepository } from 'src/blueprints';
import { Attribute } from 'src/internal';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Attribute)
export class AttributeRepository extends DefaultRepository<Attribute> {
  
}

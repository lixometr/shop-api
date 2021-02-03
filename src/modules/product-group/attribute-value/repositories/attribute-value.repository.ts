import { AttributeValue, DefaultRepository } from 'src/internal';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(AttributeValue)
export class AttributeValueRepository extends DefaultRepository<AttributeValue> {
   
}

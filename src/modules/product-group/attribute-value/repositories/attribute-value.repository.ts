import { AttributeValue, DefaultRepository } from 'src/internal';
import { EntityRepository, Repository } from 'typeorm';
import { AttributeValueName } from '../attribute-value.constants';

@EntityRepository(AttributeValue)
export class AttributeValueRepository extends DefaultRepository<AttributeValue> {
    public name = AttributeValueName
}

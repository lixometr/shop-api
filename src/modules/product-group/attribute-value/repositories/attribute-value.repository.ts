import { AttributeValue, DefaultRepository, RequestPayload } from 'src/internal';
import { EntityRepository, Repository } from 'typeorm';
import { AttributeValueName } from '../attribute-value.constants';

@EntityRepository(AttributeValue)
export class AttributeValueRepository extends DefaultRepository<AttributeValue> {
    public name = AttributeValueName
    async findItemsByAttributeId({ id }, payload: RequestPayload) {
        const query = this.createQueryBuilder(this.name)
            .where('attributeId = :id', { id })
        return this.findMany(query, payload)
    }
}

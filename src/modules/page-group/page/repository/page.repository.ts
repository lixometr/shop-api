import { DefaultRepository, SerializeGroup } from 'src/internal';
import { PublishStatus } from 'src/internal';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { Page } from '../entities/page.entity';
import { PageName } from '../page.constants';

@EntityRepository(Page)
export class PageRepository extends DefaultRepository<Page> {
    public name = PageName
    restrictions(query: SelectQueryBuilder<Page>, payload){
        super.restrictions(query, payload)
        const groups = payload.getGroups()
        if (!groups.includes(SerializeGroup.Admin)) {
            query.andWhere(`${this.name}.status = :status`, { status: PublishStatus.Published })
        }
        return query
    }
}

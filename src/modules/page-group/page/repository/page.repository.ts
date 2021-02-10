import { DefaultRepository } from 'src/internal';
import { EntityRepository, Repository } from 'typeorm';
import { Page } from '../entities/page.entity';
import { PageName } from '../page.constants';

@EntityRepository(Page)
export class PageRepository extends DefaultRepository<Page> {
    public name = PageName
}

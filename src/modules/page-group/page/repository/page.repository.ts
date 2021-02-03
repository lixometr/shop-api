import { DefaultRepository } from 'src/internal';
import { EntityRepository, Repository } from 'typeorm';
import { Page } from '../entities/page.entity';

@EntityRepository(Page)
export class PageRepository extends DefaultRepository<Page> {
    
}

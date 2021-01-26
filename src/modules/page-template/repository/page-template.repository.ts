import { DefaultRepository } from 'src/internal';
import { EntityRepository, Repository } from 'typeorm';
import { PageTemplate } from '../entities/page-template.entity';

@EntityRepository(PageTemplate)
export class PageTemplateRepository extends DefaultRepository<PageTemplate> {
    
}

import { DefaultRepository } from 'src/internal';
import { EntityRepository } from 'typeorm';
import { PageTemplate } from '../entities/page-template.entity';
import { PageTemplateName } from '../page-template.constants';

@EntityRepository(PageTemplate)
export class PageTemplateRepository extends DefaultRepository<PageTemplate> {
    public name = PageTemplateName
}

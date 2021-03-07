import { DefaultRepository } from 'src/blueprints/default.repository';
import { EntityRepository, Repository } from 'typeorm';
import { SectionTag } from '../entities/section-tag.entity';
import { SectionTagName } from '../section-tag.constants';

@EntityRepository(SectionTag)
export class SectionTagRepository extends DefaultRepository<SectionTag> {
    public name = SectionTagName
}

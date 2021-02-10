import { DefaultRepository } from 'src/internal';
import { EntityRepository, Repository } from 'typeorm';
import { Section } from '../entities/section.entity';
import { SectionName } from '../section.constants';

@EntityRepository(Section)
export class SectionRepository extends DefaultRepository<Section> {
    public name = SectionName
}

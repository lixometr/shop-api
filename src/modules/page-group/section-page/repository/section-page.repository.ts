import { PaginationResponse } from 'src/internal';
import { RequestPayload } from 'src/internal';
import { DefaultRepository } from 'src/internal';
import { EntityRepository, Repository } from 'typeorm';
import { SectionPage } from '../entities/section-page.entity';
import { SectionPageName } from '../section-page.constants';

@EntityRepository(SectionPage)
export class SectionPageRepository extends DefaultRepository<SectionPage> {
    public name = SectionPageName
    async findBySectionId({ id }, payload: RequestPayload): Promise<PaginationResponse<SectionPage>> {
        return this.findWithPagination({
            where: {
                sectionId: id
            }
        }, payload)
    }
}

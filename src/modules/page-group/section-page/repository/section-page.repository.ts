import { PaginationResponse } from 'src/internal';
import { RequestPayload } from 'src/internal';
import { DefaultRepository } from 'src/internal';
import { EntityRepository, Repository } from 'typeorm';
import { SectionPage } from '../entities/section-page.entity';

@EntityRepository(SectionPage)
export class SectionPageRepository extends DefaultRepository<SectionPage> {
    async findBySectionId({ id }, payload: RequestPayload): Promise<PaginationResponse<SectionPage>> {
        return this.findWithPagination({
            where: {
                sectionId: id
            }
        }, payload)
    }
}

import { PaginationResponse, PublishStatus, SerializeGroup } from 'src/internal';
import { RequestPayload } from 'src/internal';
import { DefaultRepository } from 'src/internal';
import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { SectionPage } from '../entities/section-page.entity';
import { SectionPageName } from '../section-page.constants';

@EntityRepository(SectionPage)
export class SectionPageRepository extends DefaultRepository<SectionPage> {
    public name = SectionPageName
    restrictions(query: SelectQueryBuilder<SectionPage>, payload: RequestPayload) {
        super.restrictions(query, payload)
        const groups = payload.getGroups()
        if (!groups.includes(SerializeGroup.Admin)) {
            query.andWhere(`${this.name}.status = :status`, { status: PublishStatus.Published })
        }
        return query
    }
    async findBySectionId({ id }, payload: RequestPayload): Promise<PaginationResponse<SectionPage>> {
        const query = this.createQueryBuilder(this.name)
            .where(`${this.name}.sectionId = :id`, { id })
        return this.findMany(query, payload)
    }

    async searchBySectionId({ sectionId, value }, payload: RequestPayload) {
        const query = this.QSearch({ value }, payload)
        query.andWhere(`${this.name}.sectionId = :sectionId`, { sectionId })
        return this.findMany(query, payload)
    }
}

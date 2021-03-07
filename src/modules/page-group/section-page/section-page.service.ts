import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { ID, RequestPayload } from 'src/internal';
import { SectionPage } from './entities/section-page.entity';
import { SectionPageRepository } from './repository/section-page.repository';
import { SectionPageName } from './section-page.constants';

@Injectable()
export class SectionPageService extends ServiceBlueprint<SectionPage>{
  public name = SectionPageName
  constructor(private sectionPageRepository: SectionPageRepository, private eventEmiter: EventEmitter2) { super(sectionPageRepository, eventEmiter) }
  async findBySectionId({ id }, payload: RequestPayload) {
    return this.sectionPageRepository.findBySectionId({ id }, payload)
  }
  async searchBySectionId({ id, name }: { id: ID, name: string }, payload: RequestPayload) {
    if (name) {
      return this.sectionPageRepository.searchBySectionId({ sectionId: id, value: name }, payload)
    } else {
      return this.findBySectionId({ id }, payload)
    }
  }
}

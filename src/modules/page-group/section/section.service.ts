import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { RequestPayload } from 'src/internal';
import { SectionPageService } from '../section-page/section-page.service';
import { Section } from './entities/section.entity';
import { SectionRepository } from './repository/section.repository';

@Injectable()
export class SectionService extends ServiceBlueprint<Section>{
  public name = 'section'
  constructor(private sectionRepository: SectionRepository, private eventEmiter: EventEmitter2, private sectionPageService: SectionPageService) { super(sectionRepository, eventEmiter) }
  async findPagesById({ id }, payload: RequestPayload) {
    return this.sectionPageService.findBySectionId({ id }, payload)
  }
  async findPagesBySlug({ slug }, payload: RequestPayload) {
    const item = await this.findBySlug({ slug }, payload)
    if(!item) throw new BadRequestException('Item with such id not found')
    return this.findPagesById({ id: item.id }, payload)
  }
}

import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { SectionTag } from './entities/section-tag.entity';
import { SectionTagName } from './section-tag.constants';
import { SectionTagRepository } from './repository/section-tag.repository';

@Injectable()
export class SectionTagService extends ServiceBlueprint<SectionTag>{
  public name = SectionTagName
  constructor(private sectionTagRepository: SectionTagRepository, private eventEmiter: EventEmitter2) { super(sectionTagRepository, eventEmiter) }
 
}

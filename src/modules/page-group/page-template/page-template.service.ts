import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { PageTemplate } from './entities/page-template.entity';
import { PageTemplateName } from './page-template.constants';
import { PageTemplateRepository } from './repository/page-template.repository';

@Injectable()
export class PageTemplateService extends ServiceBlueprint<PageTemplate>{
  public name = PageTemplateName
  constructor(private pageTemplateRepository: PageTemplateRepository, private eventEmiter: EventEmitter2) { super(pageTemplateRepository, eventEmiter) }
 
}

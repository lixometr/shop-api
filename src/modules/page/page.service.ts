import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { Page } from './entities/page.entity';
import { PageRepository } from './repository/page.repository';

@Injectable()
export class PageService extends ServiceBlueprint<Page>{
  public name = 'page'
  constructor(private pageRepository: PageRepository, private eventEmiter: EventEmitter2) { super(pageRepository, eventEmiter) }
 
}

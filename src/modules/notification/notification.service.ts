import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { ServiceBlueprint } from 'src/blueprints/service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from "./entities/notification.entity"
import { NotificationName } from './notification.constants';
import { NotificationRepository } from './repositories/notification.repository';

@Injectable()
export class NotificationService extends ServiceBlueprint<Notification>{
  public name = NotificationName
  constructor(private itemRepository: NotificationRepository, private eventEmiter: EventEmitter2) { super(itemRepository, eventEmiter) }

}

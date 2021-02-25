import { Controller, Get, Post, Body, Put, Param, Delete, SerializeOptions } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { NotificationName } from './notification.constants';
import { GetRequestPayload, ID } from 'src/internal';
import { RequestPayload } from 'src/internal';
import { AuthAdmin } from 'src/decorators';
import { SerializeGroup } from 'src/internal';

@Controller('notification')
export class NotificationController extends ControllerBlueprint {
  public name = NotificationName
  constructor(private readonly notificationService: NotificationService) { super(notificationService) }

  @SerializeOptions({ groups: [SerializeGroup.AdminFull, SerializeGroup.Admin] })
  @AuthAdmin()
  @Post()
  create(@Body() data: CreateNotificationDto, @GetRequestPayload() payload: RequestPayload) {
    return super.create(data, payload)
  }

  @SerializeOptions({ groups: [SerializeGroup.AdminFull, SerializeGroup.Admin] })
  @AuthAdmin()
  @Put('/id/:id')
  update(@Param('id') id: ID, @Body() updateDto: UpdateNotificationDto, @GetRequestPayload() payload: RequestPayload) {
    return super.update(id, updateDto, payload)
  }

  findBySlug() { return null }

}

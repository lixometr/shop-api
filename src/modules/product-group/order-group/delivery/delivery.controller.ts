import { Controller, Get, Post, Body, Put, Param, Delete, SerializeOptions } from '@nestjs/common';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { AuthAdmin, SerializeGroup } from 'src/internal';
import { ID, RequestPayload } from 'src/internal';
import { GetRequestPayload } from 'src/internal';
import { DeliveryName } from './delivery.constants';
import { DeliveryService } from './delivery.service';
import { DeliveryTypes } from './delivery.types';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Controller('delivery')
export class DeliveryController extends ControllerBlueprint {
  public name = DeliveryName
  constructor(private readonly deliveryService: DeliveryService) { super(deliveryService) }
  findBySlug() { return null }
  findBySlugAdmin() { return null }
  findAll() {return null}
  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  @AuthAdmin()
  @Post()
  create(@Body() data: CreateDeliveryDto, @GetRequestPayload() payload: RequestPayload) {
    return this.deliveryService.create({ data }, payload)
  }

  @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.AdminFull] })
  @AuthAdmin()
  @Put('/id/:id')
  update(@Param('id') id: ID, @Body() data: UpdateDeliveryDto, @GetRequestPayload() payload: RequestPayload) {
    return this.deliveryService.updateById({ id, data }, payload)
  }

  @SerializeOptions({ groups: [SerializeGroup.Info, SerializeGroup.Translate] })
  @Get('available')
  findAvailableDelivery(@GetRequestPayload() payload: RequestPayload) {
    return this.deliveryService.findAvailable({}, payload)
  }

  @SerializeOptions({ groups: [SerializeGroup.Info, SerializeGroup.Translate] })
  @Get('pickup')
  findDeliveryPickup(@GetRequestPayload() payload: RequestPayload) {
    return this.deliveryService.findByType({ type: DeliveryTypes.pickup }, payload)
  }

  @SerializeOptions({ groups: [SerializeGroup.Info, SerializeGroup.Translate] })
  @Get('courier')
  findDeliveryCourier(@GetRequestPayload() payload: RequestPayload) {
    return this.deliveryService.findByType({ type: DeliveryTypes.courier }, payload)
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from 'eventemitter2';
import { ServiceBlueprint } from 'src/blueprints/service';
import { ID, RequestPayload, SLUG } from 'src/internal';
import { CreateWidgetDto } from './dto/create-widget.dto';
import { UpdateWidgetDto } from './dto/update-widget.dto';
import { Widget } from './entities/widget.entity';
import { WidgetRepository } from './repositories/widget.repository';
import { WidgetName } from './widget.constants';
import { WidgetDefiner } from "./models/widget-definer"
import { ValidationError } from 'class-validator';
@Injectable()
export class WidgetService extends ServiceBlueprint<Widget>{
  public name = WidgetName
  constructor(private itemRepository: WidgetRepository, private eventEmiter: EventEmitter2) { super(itemRepository, eventEmiter) }
  async findBySlug({ slug }, payload: RequestPayload) {
    const widget = await super.findBySlug({ slug }, payload)
    const Model = new WidgetDefiner(slug).getModel()
    if(!Model) return null
    const model = new Model({ widget })
    return model.toJSON()
  }
  async updateBySlug({slug, data}: {data: any, slug: SLUG}, payload: RequestPayload) {
    let item = await super.findBySlug({slug}, payload)
    const Model = new WidgetDefiner(slug).getModel()
    if(!Model) throw new BadRequestException('Widget Not Found')
    const model = new Model()
    try {
      const result = await model.validate(data)

      if(!item) {
        const toCreate = {...result}
        item = await this.create({data: toCreate}, payload)
      }
      return this.updateById({ id: item.id, data: result }, payload)
    } catch (err) {
      throw new BadRequestException(err)
    }
  }
  async updateById({ id, data }: {id: ID, data: any}, payload: RequestPayload) {
    const item = await this.findById({id}, payload)
    if (!item) throw new BadRequestException()
    const Model = new WidgetDefiner(item.slug).getModel()
    if(!Model) throw new BadRequestException('Widget Not Found')
    const model = new Model()
    try {
      const result = await model.validate(data)
      return super.updateById({ id, data: result }, payload)
    } catch (err) {
      throw new BadRequestException(err)
    }
  }
}

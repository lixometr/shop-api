import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { ID, RequestPayload, SLUG } from 'src/internal';
import { SerializeGroup } from 'src/internal';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Settings } from "./entities/settings.entity"
import { SettingsRepository } from './repositories/settings.repository';
import { SettingsName } from './settings.constants';
import { SecuredSettings, SettingsNames } from './settings.types';
@Injectable()
export class SettingsService extends ServiceBlueprint<Settings>{
  public name = SettingsName
  constructor(private settingsRepository: SettingsRepository, private eventEmiter: EventEmitter2) { super(settingsRepository, eventEmiter) }

  findBySlug({ slug, internal }: { slug: SLUG, internal?: boolean }, payload: RequestPayload) {
    if (!internal) {
      if (SecuredSettings.includes(slug)) {
        // const user = payload.getUser()
        const groups = payload.getGroups()
        if(!groups.includes(SerializeGroup.Admin)) return
      }
    }
    return super.findBySlug({ slug }, payload)
  }


  async updateBySlug({ slug, data }: { data: UpdateSettingDto, slug: SLUG }, payload: RequestPayload) {
    let item = await super.findBySlug({ slug }, payload)
    if (!item) {

      if (!Object.values<string>(SettingsNames).includes(slug)) throw new BadRequestException('Setting with such slug does not exists')
      const toCreate = { ...data, slug }
      item = await this.create({ data: toCreate }, payload)
    }
    return this.updateById({ id: item.id, data }, payload)
  }
  async updateById({ id, data }: { id: ID, data: UpdateSettingDto }, payload: RequestPayload) {
    const item = await this.findById({ id }, payload)
    if (!item) throw new BadRequestException('Item with such id not found')
    return super.updateById({ id, data }, payload)

  }
}

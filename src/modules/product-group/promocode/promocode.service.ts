import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceBlueprint } from 'src/blueprints/service';
import { RequestPayload } from 'src/internal';
import { Repository } from 'typeorm';
import { CreatePromocodeDto } from './dto/create-promocode.dto';
import { UpdatePromocodeDto } from './dto/update-promocode.dto';
import { Promocode } from './entities/promocode.entity';
import { PromocodeUsedPerUser } from './entities/promocode.used.entity';
import { PromocodeName } from './promocode.constants';
import { PromocodeRepository } from './repositories/promocode.repository';

@Injectable()
export class PromocodeService extends ServiceBlueprint<Promocode> {
  public name = PromocodeName
  constructor(private readonly itemRepository: PromocodeRepository, private eventEmiter: EventEmitter2, @InjectRepository(PromocodeUsedPerUser) private usedPerUserRepository: Repository<PromocodeUsedPerUser>) { super(itemRepository, eventEmiter) }
  findByName({ name }: { name: string }, payload: RequestPayload) {
    return this.itemRepository.findByName({ name }, payload)
  }
  canUse({ promocode }: { promocode: Promocode }, payload: RequestPayload): boolean {
    if (!promocode) return false
    const user = payload.getUser()
    if (!user) return false
    if (promocode.endDate) {
      const nowDate = new Date()
      if (new Date(promocode.endDate).getTime() > nowDate.getTime()) return false
    }
    if (promocode.useCount > -1) {
      if (promocode.usedTimes >= promocode.useCount) return false
    }
    if (!this.canUserUse({ promocode }, payload)) return false
    return true
  }
  async useUser({ promocode }: { promocode: Promocode }, payload: RequestPayload): Promise<boolean> {
    const user = payload.getUser()
    if (!user) return false
    const item = await this.usedPerUserRepository.findOne({ where: { promocodeId: promocode.id } })
    if (!item) {
      const newValue: Partial<PromocodeUsedPerUser> = {
        promocode: promocode,
        user,
        times: 1
      }
      await this.usedPerUserRepository.save(this.usedPerUserRepository.create(newValue))
    } else {
      item.times += 1
      await this.usedPerUserRepository.save(item)
    }
    return true
  }
  canUserUse({ promocode }: { promocode: Promocode }, payload: RequestPayload): boolean {
    const user = payload.getUser()
    if (!user) return false
    const idxInUsed = promocode.usedPerUser.findIndex(item => item.userId == user.id)
    if (idxInUsed < 0) return true
    const itemInUsed = promocode.usedPerUser[idxInUsed]
    const usedTimes = itemInUsed.times
    if (usedTimes > promocode.useUserCount) return false
    return true
  }
  async use({ promocode }: { promocode: Promocode }, payload: RequestPayload): Promise<boolean> {
    if (!promocode) return false
    if (!this.canUse({ promocode }, payload)) return false
    const id = promocode.id
    const newValue: Partial<Promocode> = {
      usedTimes: promocode.usedTimes + 1,
    }
    await this.updateById({ id, data: newValue }, payload)
    await this.useUser({ promocode }, payload)
    return true
  }
}

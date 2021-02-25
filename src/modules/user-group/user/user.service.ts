import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ServiceBlueprint } from 'src/blueprints/service';
import { PasswordService } from '../password.service';
import { ConfirmService } from '../confirm.service';
import { UserRepository } from './repositories/user.repository';
import { ID, RequestPayload } from 'src/internal';
import { User } from 'src/internal';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UserService extends ServiceBlueprint<User>{
    public name = 'user'
    constructor(
        private userRepository: UserRepository,
        private passwordService: PasswordService,
        private confirmService: ConfirmService,
        private eventEmiter: EventEmitter2

    ) { super(userRepository, eventEmiter) }

    async create({ data }: { data: CreateUserDto, }, payload: RequestPayload): Promise<User> {
        const toCreate: any = { ...data }
        toCreate.password = await this.passwordService.hashPassword(data.password)
        toCreate.confirmKey = await this.confirmService.generateKey()
        const result = await super.create({data: toCreate}, payload)
        return result
    }
    async checkPassword(userId: ID, password: string): Promise<boolean> {
        const user = await this.findById({id: userId})
        return await this.passwordService.comparePassword(password, user.password)
    }
    async confirm(key: string): Promise<true> {
        const user = await this.userRepository.findOne({ where: { confirmKey: key } })
        if (!user) throw new BadRequestException('User not found')
        user.confirmKey = null
        user.isConfirmed = true
        await this.userRepository.save(user)
        return true
    }
    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { email } })
    }
}

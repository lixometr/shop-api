import { Injectable } from '@nestjs/common';
import { CreateUserAdminDto } from './dto/create-userAdmin.dto';
import { ServiceBlueprint } from 'src/blueprints/service';
import { UserAdmin } from './entities/userAdmin.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupAdminDto } from '../../auth-group/authAdmin/dto/signupAdmin.dto';
import { PasswordService } from '../password.service';
import { UserAdminRepository } from './repositories/userAdmin.repository';
import { RequestPayload } from 'src/internal';
import { EventEmitter2 } from '@nestjs/event-emitter';
@Injectable()
export class UserAdminService extends ServiceBlueprint<UserAdmin>{
    public name = 'userAdmin'
    constructor(
         private userAdminRepository: UserAdminRepository,
        private passwordService: PasswordService,
        private eventEmiter: EventEmitter2
    ) { super(userAdminRepository, eventEmiter) }

    async create({data}: {data: SignupAdminDto}, payload: RequestPayload): Promise<UserAdmin> {
        data.password = await this.passwordService.hashPassword(data.password)
        const result = await super.create({data}, payload)
        return result

    }
    async checkPassword(userId, password: string): Promise<boolean> {
        const user = await this.findById(userId)
        return await this.passwordService.comparePassword(password, user.password)
    }
    async findByLogin(login: string): Promise<UserAdmin> {
        return await this.userAdminRepository.findOne({ where: { login } })
    }
}

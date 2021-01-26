import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAdmin } from '../../userModule/userAdmin/entities/userAdmin.entity';
import { UserAdminService } from '../../userModule/userAdmin/userAdmin.service';
import { IJwtAdmin } from './interfaces/jwtAdmin.interface';
import { ITokenAdmin } from "./interfaces/tokenAdmin.interface"
import { SignupAdminDto } from './dto/signupAdmin.dto';
import { ID } from 'src/internal';
import { AppConfig } from 'src/config';
import { RequestPayload } from 'src/internal';
@Injectable()
export class AuthAdminService {
    constructor(private userAdminService: UserAdminService,
        private jwtService: JwtService) { }

    async validateUser(login: string, pass: string): Promise<UserAdmin> {
        const userAdmin = await this.userAdminService.findByLogin(login);
        if (userAdmin) {
            const isPassValid = await this.userAdminService.checkPassword(userAdmin.id, pass)
            if (!isPassValid) return null
            return userAdmin;
        }
        return null;
    }

    async login(userAdmin: UserAdmin): Promise<ITokenAdmin> {
        const payload: IJwtAdmin = this.createToken(userAdmin.id)
        const secret = AppConfig.get<string>('jwt.secretAdmin')
        const expiresIn = AppConfig.get<number>('jwt.expiresInAdmin')
        return {
            token: this.jwtService.sign(payload, { secret, expiresIn }),
            expiresIn
        };
    }

    createToken(id: ID): IJwtAdmin {
        return { sub: id, isAdmin: true };
    }

    async signup(data: SignupAdminDto, payload: RequestPayload): Promise<UserAdmin> {
        const isExist = await this.userAdminService.findByLogin(data.login)
        if (isExist) throw new UnprocessableEntityException('User already exists')
        return await this.userAdminService.create({data}, payload)
    }
}

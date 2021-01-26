import { Injectable, UnprocessableEntityException } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../userModule/user/user.service';
import { IJwt } from './interfaces/jwt.interface';
import { IToken } from "./interfaces/token.interface"
import { SignupDto } from './dto/signup.dto';
import { ID } from 'src/internal';
import { AppConfig } from 'src/config';
import { User } from 'src/internal';
import { RequestPayload } from 'src/internal';
@Injectable()
export class AuthService {
    constructor(private userService: UserService,
        private jwtService: JwtService) { }

    async validateUser(email: string, pass: string): Promise<User> {
        const user = await this.userService.findByEmail(email);
        if (user ) {
            const isPassValid = await this.userService.checkPassword(user.id, pass)
            if(!isPassValid) return null
            return user;
        }
        return null;
    }
    async login(user: User): Promise<IToken> {
        const payload: IJwt = this.createToken(user.id);
        const secret = AppConfig.get<string>('jwt.secret')
        const expiresIn = AppConfig.get<number>('jwt.expiresIn')
        return {
            token: this.jwtService.sign(payload, { secret, expiresIn }),
            expiresIn
        };
    }
    async confirmUser(key: string) {
        return await this.userService.confirm(key)
    }
    createToken(id: ID): IJwt {
        return { sub: id, isAdmin: false };
    }

    

    async signup(data: SignupDto, payload: RequestPayload): Promise<User> {
        const isExist = await this.userService.findByEmail(data.email)
        if (isExist) throw new UnprocessableEntityException('User already exists')
        return await this.userService.create({data}, payload)
    }
}

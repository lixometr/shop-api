import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../../user-group/user/user.service';
import { IJwt } from '../interfaces/jwt.interface';
import { AppConfig } from 'src/config';
import { User } from 'src/internal';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'auth-jwt') {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: AppConfig.get('jwt.secret'),
            
        });
    }

    async validate(payload: IJwt): Promise<User | false> {
        const id = payload.sub
        const isAdmin = payload.isAdmin
        if (isAdmin) return false
        const user = await this.userService.findById({id})
        if (!user) return false;
        return user
    }
}
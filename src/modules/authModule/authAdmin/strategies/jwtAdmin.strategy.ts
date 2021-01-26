import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { IJwtAdmin } from '../interfaces/jwtAdmin.interface';
import { UserAdmin } from 'src/modules/userModule/userAdmin/entities/userAdmin.entity';
import { UserAdminService } from 'src/modules/userModule/userAdmin/userAdmin.service';
import { AppConfig } from 'src/config';
@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, 'authAdmin-jwt') {
    constructor( private userAdminService: UserAdminService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: AppConfig.get<string>('jwt.secretAdmin'),
        });
    }

    async validate(payload: IJwtAdmin): Promise<UserAdmin | false> {
        const id = payload.sub
        const isAdmin = payload.isAdmin
        if (!isAdmin) return false
        const user = await this.userAdminService.findById({id})
        if(!user) return false;
        return user
    }
}
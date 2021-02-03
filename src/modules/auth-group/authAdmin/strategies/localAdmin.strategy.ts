
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable,  UnauthorizedException } from '@nestjs/common';
import { AuthAdminService } from '../authAdmin.service';
import { UserAdmin } from 'src/modules/user-group/userAdmin/entities/userAdmin.entity';

@Injectable()
export class LocalAdminStrategy extends PassportStrategy(Strategy, 'authAdmin-local') {
    constructor(private authAdminService: AuthAdminService) {
        super({ usernameField: 'login' });
    }

    async validate(username: string, password: string): Promise<UserAdmin> {
        const user = await this.authAdminService.validateUser(username, password);
        if (!user) {
            throw new BadRequestException('Login or password incorrect')
        }
        return user;
    }
}

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from 'src/internal';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'auth-local') {
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' });
    }

    async validate(username: string, password: string): Promise<User> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException('Email or password are invalid');
        }
        return user;
    }
}
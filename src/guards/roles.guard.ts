
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/constants';
import { Roles } from 'src/modules/userModule/user/user.types';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {

        const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (requiredRoles.length < 1) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();

        return requiredRoles.some((role) => user?.role?.indexOf(role) > -1);
    }
}
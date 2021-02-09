
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_ADMIN_KEY, ROLES_KEY } from 'src/constants';
import { AdminRoles } from 'src/modules/user-group/userAdmin/userAdmin.types';

@Injectable()
export class AdminRolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {

        const requiredRoles = this.reflector.getAllAndOverride<AdminRoles[]>(ROLES_ADMIN_KEY, [
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
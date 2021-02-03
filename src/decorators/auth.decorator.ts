
import { applyDecorators, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/modules/auth-group/auth/guards/jwt-auth.guard';
import { Roles } from 'src/modules/user-group/user/user.types';
import { HasRoles } from './role.decorator';

export function Auth(...roles: Roles[]) {
  return applyDecorators(
    HasRoles(...roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}
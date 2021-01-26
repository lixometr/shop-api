
import { applyDecorators, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/modules/authModule/auth/guards/jwt-auth.guard';
import { Roles } from 'src/modules/userModule/user/user.types';
import { HasRoles } from './role.decorator';

export function Auth(...roles: Roles[]) {
  return applyDecorators(
    HasRoles(...roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
}
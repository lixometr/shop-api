
import { applyDecorators, UseGuards } from '@nestjs/common';
import { AdminRolesGuard } from 'src/guards/rolesAdmin.guard';
import { JwtAuthAdminGuard } from 'src/modules/auth-group/authAdmin/guards/jwt-authAdmin.guard';
import { AdminRoles } from 'src/internal';
import { HasAdminRoles } from './role.decorator';

export function AuthAdmin(...roles: AdminRoles[]) {
  return applyDecorators(
    HasAdminRoles(...roles),
    UseGuards(JwtAuthAdminGuard, AdminRolesGuard),
  );
}
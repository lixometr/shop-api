
import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY, ROLES_ADMIN_KEY } from 'src/constants';
import { Roles as UserRoles } from 'src/modules/user-group/user/user.types';
import { AdminRoles as UserAdminRoles} from 'src/modules/user-group/userAdmin/userAdmin.types';


export const HasRoles = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles);
export const HasAdminRoles = (...roles: UserAdminRoles[]) => SetMetadata(ROLES_ADMIN_KEY, roles);
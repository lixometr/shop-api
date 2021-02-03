import { Module } from '@nestjs/common';
import { AuthAdminService } from './authAdmin.service';
import { AuthAdminController } from './authAdmin.controller';
import { UserAdminModule } from '../../user-group/userAdmin/userAdmin.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAdminStrategy } from './strategies/jwtAdmin.strategy';
import { LocalAdminStrategy } from './strategies/localAdmin.strategy';
import { PasswordService } from 'src/modules/user-group/password.service';


@Module({
  imports: [JwtModule.register({}), UserAdminModule, PassportModule],
  controllers: [AuthAdminController],
  providers: [AuthAdminService, LocalAdminStrategy, JwtAdminStrategy],
  exports: [AuthAdminService]
})
export class AuthAdminModule { }

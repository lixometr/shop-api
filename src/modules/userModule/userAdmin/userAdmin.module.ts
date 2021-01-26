import { Module } from '@nestjs/common';
import { UserAdminService } from './userAdmin.service';
import { UserAdminController } from './userAdmin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from '../password.service';
import { UserAdminRepository } from './repositories/userAdmin.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserAdminRepository])],
  controllers: [UserAdminController],
  providers: [UserAdminService, PasswordService],
  exports: [UserAdminService,]
})
export class UserAdminModule {}

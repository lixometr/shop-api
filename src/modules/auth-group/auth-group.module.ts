import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { AuthAdminModule } from "./authAdmin/authAdmin.module";


@Module({
  imports: [AuthModule, AuthAdminModule],
})
export class AuthGroupModule { }
 
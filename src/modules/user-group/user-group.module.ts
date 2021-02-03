import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { UserAdminModule } from "./userAdmin/userAdmin.module";

@Module({
 imports: [UserModule, UserAdminModule]
})
export class UserGroupModule {}

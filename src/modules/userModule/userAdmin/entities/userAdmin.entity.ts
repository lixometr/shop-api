import { Exclude } from "class-transformer";
import { EntityDefaultBlueprint } from "src/internal";
import { Column, Entity } from "typeorm";
import { AdminRoles } from "../userAdmin.types";

@Entity()
export class UserAdmin extends EntityDefaultBlueprint{
    @Column({nullable: true})
    firstName: string;

    @Column({nullable: true})
    lastName: string;

    @Column({nullable: true})
    email: string;

    @Column({unique: true})
    login: string;

    @Exclude()
    @Column()
    password?: string;

   
    @Column({ default: AdminRoles.ADMIN})
    role: AdminRoles;
}

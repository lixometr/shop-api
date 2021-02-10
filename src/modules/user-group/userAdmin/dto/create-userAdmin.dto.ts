import { IsBoolean, IsEmail, IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { AdminRoles } from "../userAdmin.types";

export class CreateUserAdminDto {
    
    @IsString()
    login: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsEmail()
    email: string;
    
    @IsOptional()
    @IsEnum(AdminRoles)
    role: AdminRoles;

    @IsOptional()
    @IsInt()
    sortOrder: number
}

import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { Roles } from "../user.types";

export class CreateUserDto {
    
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;


}

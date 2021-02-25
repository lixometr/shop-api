import { IsEmail, IsInt, IsOptional, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    phone: string

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsOptional()
    @IsInt()
    sortOrder: number

}

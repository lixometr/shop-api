import { Exclude } from "class-transformer";
import { Allow, IsInt, IsString } from "class-validator";
import { ID } from "src/internal";

export class CreateOrderUserDto {

    @IsInt()
    id: ID

    @IsString()
    firstName: string

    @IsString()
    email: string;

    // @Allow()
    // role: any
}
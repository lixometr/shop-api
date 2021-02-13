import { IsInt, IsString } from "class-validator";
import { ID } from "src/internal";

export class CreateOrderUserDto {
    
    @IsInt()
    id: ID

    @IsString()
    firstName: string

    @IsString()
    lastName: string

    @IsString()
    email: string;
}
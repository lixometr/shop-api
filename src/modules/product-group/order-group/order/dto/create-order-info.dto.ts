import { IsString } from "class-validator"

export class CreateOrderInfoDto {
    
    @IsString()
    name: string

    @IsString()
    email: string
}
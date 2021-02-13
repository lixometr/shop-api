import { IsInt, IsString } from "class-validator"
import { ID } from "src/internal"

export class CreateOrderDeliveryTypeDto {
    @IsInt()
    id: ID

    @IsString()
    name: string
}
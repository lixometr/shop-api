import { IsInt, IsNumber, IsOptional, IsString } from "class-validator"
import { ID } from "src/internal"

export class CreateOrderDeliveryDto {
    @IsInt()
    id: ID

    @IsString()
    type: string

    @IsOptional()
    @IsString()
    address?: string

    @IsOptional()
    @IsString()
    deliveryTime?: string

    @IsOptional()
    @IsNumber()
    price?: number
}
import { IsEnum, IsInt, IsNumber, IsString } from "class-validator"
import { ID, PromocodeTypes } from "src/internal"

export class CreateOrderPromocodeDto {

    @IsInt()
    id: ID

    @IsEnum(PromocodeTypes)
    saleType: PromocodeTypes

    @IsNumber()
    sale: number

    @IsString()
    name: string
}
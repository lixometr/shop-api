import { Allow, IsInt, IsNumber, IsString } from "class-validator"
import { ID, PromocodeTypes } from "src/internal"

export class CreateOrderPromocodeDto {

    @IsInt()
    id: ID

    @Allow()
    saleType: any

    @IsNumber()
    sale: number

    @IsString()
    name: string
}
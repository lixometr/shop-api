import { Type } from "class-transformer"
import { IsInt, IsObject, ValidateNested } from "class-validator"
import { ID, OrderProductItem, Product, Promocode } from "src/internal"
import { CreateProductDto } from "src/internal"

export class CartProductActiveOptions {
    [key: number]: Array<ID>
}

export class CartProductDto {

    @ValidateNested()
    product: Product | OrderProductItem

    @IsObject()
    @Type(() => CartProductActiveOptions)
    activeOptions: CartProductActiveOptions

    @IsInt()
    cnt: number

    @IsInt()
    activeVariation: ID

}
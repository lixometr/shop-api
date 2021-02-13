import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateOrderProductDto, IdDto } from "src/internal";
import { ToCreateOrderProductDto } from "./create-order-product.dto";

export class ToCreateOrderDto {

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each: true})
    @Type(() => ToCreateOrderProductDto)
    products: ToCreateOrderProductDto[]

    @IsOptional()
    @IsString()
    promocode: string

    @IsString()
    deliveryType: string    

    @IsString()
    orderType: string


}

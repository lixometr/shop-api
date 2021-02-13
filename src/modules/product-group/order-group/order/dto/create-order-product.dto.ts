import { Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateImageDto, CreateProductOptionDto, CreateProductVariationDto, ID, IdDto, ProductStatus, ProductType } from "src/internal";
import { CartProductActiveOptions } from "src/internal";
import { CreateOrderProductItemDto } from "./create-order-product-item.dto";

export class ToCreateOrderProductDto {

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => IdDto)
    product: IdDto
    
    @IsObject()
    @Type(() => CartProductActiveOptions)
    activeOptions: CartProductActiveOptions

    @IsInt()
    cnt: number

    @IsInt()
    activeVariation: ID
}
export class CreateOrderProductDto {

    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateOrderProductItemDto)
    product: CreateOrderProductItemDto
    
    @IsObject()
    @Type(() => CartProductActiveOptions)
    activeOptions: CartProductActiveOptions

    @IsInt()
    cnt: number

    @IsInt()
    activeVariation: ID
}

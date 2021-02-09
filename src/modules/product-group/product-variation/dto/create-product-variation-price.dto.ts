import {  IsInt, IsNumber, IsOptional } from "class-validator";
import { ID } from "src/types";

export class CreateProductVariationPriceDto {
    @IsOptional()
    id: ID;
    
    @IsInt()
    currencyId: ID;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    oldPrice: number;

    @IsOptional()
    @IsNumber()
    sale: number;

    
}
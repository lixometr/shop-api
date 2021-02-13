import {  IsInt, IsNumber, IsOptional } from "class-validator";
import { ID } from "src/types";

export class CreatePromocodePriceDto {
    @IsOptional()
    id: ID;
    
    @IsInt()
    currencyId: ID;

    @IsNumber()
    price: number;


    
}
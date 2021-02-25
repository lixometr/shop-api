import {  IsInt, IsNumber, IsOptional, Max } from "class-validator";
import { ID } from "src/types";

export class CreatePromocodePriceDto {
    @IsOptional()
    id: ID;
    
    @IsInt()
    currencyId: ID;

    @IsNumber()
    sale: number;


    
}
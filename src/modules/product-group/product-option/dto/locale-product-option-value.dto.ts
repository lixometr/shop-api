import { Type } from "class-transformer";
import {  IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { ID } from "src/types";


export class LocaleProductOptionValueDto {

    @IsOptional()
    @IsInt()
    id: ID;
    
    @IsInt()
    localeId: ID;

    @IsString()
    name: string
}
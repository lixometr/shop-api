import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDate, IsDateString, IsEnum, IsIn, IsInt, IsOptional, ValidateNested } from "class-validator";
import { PromocodeTypes } from "../promocode.types";
import { CreateLocalePromocodeDto } from "./locale-promocode.dto";
import { CreatePromocodePriceDto } from "./price-promocode.dto";

export class CreatePromocodeDto {
    
    @IsOptional()
    @IsEnum(PromocodeTypes)
    saleType: PromocodeTypes

    @ArrayNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateLocalePromocodeDto)
    locale: CreateLocalePromocodeDto[];

    @ArrayNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePromocodePriceDto)
    value: CreatePromocodePriceDto[];

    // сколько можно использовать
    // -1- infinite
    @IsOptional()
    @IsInt()
    useCount: number

    @IsOptional()
    @IsInt()
    useUserCount: number

    @IsOptional()
    @IsDateString()
    endDate: string

    @IsOptional()
    @IsInt()
    sortOrder: number

}

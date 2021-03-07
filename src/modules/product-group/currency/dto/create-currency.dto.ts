import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { LocaleCurrencyDto } from "./locale-currency.dto";

export class CreateCurrencyDto {

    @IsString()
    slug: string;

    @IsOptional()
    @IsString()
    sign: string;

    @IsString()
    iso: string;

    @ArrayNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => LocaleCurrencyDto)
    locale: LocaleCurrencyDto[];
    
    @IsOptional()
    @IsInt()
    sortOrder: number
}

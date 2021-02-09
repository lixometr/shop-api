import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsOptional, ValidateNested } from "class-validator";
import { CreateProductVariationAttributeDto } from "./create-product-variation-attributes.dto";
import { CreateProductVariationPriceDto } from "./create-product-variation-price.dto";
import { LocaleProductVariationDto } from "./locale-product-variation.dto";

export class CreateProductVariationDto {

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateProductVariationAttributeDto)
    attributes: CreateProductVariationAttributeDto[]

    @IsOptional()
    sku: string

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LocaleProductVariationDto)
    locale: LocaleProductVariationDto[];

    @ArrayNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateProductVariationPriceDto)
    prices: CreateProductVariationPriceDto[];


}
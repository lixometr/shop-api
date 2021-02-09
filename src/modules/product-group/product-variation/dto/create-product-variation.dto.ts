import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsInt, IsOptional, ValidateNested } from "class-validator";
import { IdDto } from "src/internal";
import { ID } from "src/internal";
import { CreateProductVariationAttributeDto } from "./create-product-variation-attributes.dto";
import { CreateProductVariationPriceDto } from "./create-product-variation-price.dto";
import { LocaleProductVariationDto } from "./locale-product-variation.dto";

export class CreateProductVariationDto {

    @IsOptional()
    @IsInt()
    id: ID
    
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


    @IsOptional()
    @ValidateNested()
    @Type(() => IdDto)
    defaultImage: IdDto

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IdDto)
    images: IdDto[]


}
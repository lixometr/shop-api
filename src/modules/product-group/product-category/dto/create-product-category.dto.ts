import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsInt, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { IdDto } from "src/helpers";
import { SeoDto } from "src/internal";
import { ID } from "src/types";
import { LocaleProductCategoryDto } from "./locale-product-category.dto";
class CreateProductCategorySoonDto {
    @IsOptional()
    @IsBoolean()
    show: boolean

    @IsOptional()
    @IsString()
    color1: string

    @IsOptional()
    @IsString()
    color2: string
}
export class CreateProductCategoryDto {

    @IsString()
    slug: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => LocaleProductCategoryDto)
    locale: LocaleProductCategoryDto[];


    @IsOptional()
    @IsArray()
    children: CreateProductCategoryDto[];

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => IdDto)
    parent: IdDto;

    @IsOptional()
    @IsInt()
    sortOrder: number

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => IdDto)
    image: IdDto

    @IsOptional()
    @ValidateNested({each: true})
    @IsArray()
    @Type(() => IdDto)
    availableFilterAttributes: IdDto[]

    @IsOptional()
    @IsBoolean()
    showFilterPrice: boolean

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateProductCategorySoonDto)
    soon: CreateProductCategorySoonDto
}

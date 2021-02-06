import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { UpdateProductCategoryDto } from "../../../index";
import { LocaleProductCategoryDto } from "./locale-product-category.dto";

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
    parent: UpdateProductCategoryDto;

}

import { IsArray, IsInt, IsOptional, IsString } from "class-validator";
import { UpdateProductCategoryDto } from "../../index";

export class CreateProductCategoryDto {

    @IsString()
    slug: string;
    
    @IsString()
    name: string;

    @IsOptional()
    @IsArray()
    children: CreateProductCategoryDto[];

    @IsOptional()
    parent: UpdateProductCategoryDto;

}

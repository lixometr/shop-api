import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { LocaleProductTagDto } from "./locale-product.tag.dto";

export class CreateProductTagDto {
    
   
    @IsString()
    slug: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LocaleProductTagDto)
    locale: LocaleProductTagDto[]

    
    @IsOptional()
    @IsInt()
    sortOrder: number
    
    @IsOptional()
    @IsString()
    color: string

    @IsOptional()
    @IsString()
    color2: string
}

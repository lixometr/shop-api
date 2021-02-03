import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsOptional, IsString, ValidateNested } from "class-validator";
import { LocaleProductTagDto } from "./locale-product.tag.dto";

export class CreateProductTagDto {
    
    @IsString()
    name: string;
    
    @IsString()
    slug: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LocaleProductTagDto)
    locale: LocaleProductTagDto[]

    @IsString()
    value: string;
}

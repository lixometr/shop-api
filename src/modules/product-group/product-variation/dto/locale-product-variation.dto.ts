import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { ID, SeoDto } from "src/internal";
import { CreateProductVariationDescription } from "./create-product-variation-description";

export class LocaleProductVariationDto {
    @IsOptional()
    id: ID;
    
    @IsString()
    name: string;
  
    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateProductVariationDescription)
    description: CreateProductVariationDescription[];
  
    @IsInt()
    localeId: ID;
  
    @IsOptional()
    @ValidateNested()
    @Type(() => SeoDto)
    seo: SeoDto
}
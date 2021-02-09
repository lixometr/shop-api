import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { ID, SeoDto } from "src/internal";

export class LocaleProductVariationDto {
    @IsOptional()
    id: ID;
    
    @IsString()
    name: string;
  
    @IsString()
    description: string;
  
    @IsInt()
    localeId: ID;
  
    @IsOptional()
    @ValidateNested()
    @Type(() => SeoDto)
    seo: SeoDto
}
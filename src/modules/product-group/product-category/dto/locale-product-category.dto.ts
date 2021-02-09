import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { ID, SeoDto } from "src/internal";

export class LocaleProductCategoryDto {
    
    @IsOptional()
    @IsInt()
    id: ID;

    @IsString()
    name: string;
    
    @IsInt()
    localeId: ID;

    @IsOptional()
    @ValidateNested()
    @Type(() => SeoDto)
    seo: SeoDto
}

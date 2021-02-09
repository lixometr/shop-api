import { Type } from "class-transformer";
import { IsInt, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { ID, SeoDto } from "src/internal";


export class LocaleSectionPageDto {
    @IsOptional()
    @IsInt()
    id: ID;
    
    @IsString()
    name: string;

    @IsOptional()
    @IsObject()
    values: any

    @IsInt()
    localeId: ID;

    @IsOptional()
    @ValidateNested()
    @Type(() => SeoDto)
    seo: SeoDto

}

import { Type } from "class-transformer";
import { IsInt, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { ID, SeoDto } from "src/internal";


export class LocaleSectionDto {

    @IsOptional()
    @IsInt()
    id: ID

    @IsString()
    name: string;

    @IsInt()
    localeId: ID;

    @IsOptional()
    @ValidateNested()
    @Type(() => SeoDto)
    seo: SeoDto
}

import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsIn, IsInt, IsNotEmptyObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { ID, SeoDto } from "src/internal";
import { LocaleSectionDto } from "./locale-section.dto";

export class CreateSectionDto {

    @IsString()
    slug: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LocaleSectionDto)
    locale: LocaleSectionDto[]

    @IsInt()
    templateId: ID
    
    @IsOptional()
    @IsInt()
    sortOrder: number
  
}

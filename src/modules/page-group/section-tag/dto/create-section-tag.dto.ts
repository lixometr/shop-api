import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { LocaleSectionTagDto } from "./locale-section.tag.dto";

export class CreateSectionTagDto {
    
   
    @IsString()
    slug: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LocaleSectionTagDto)
    locale: LocaleSectionTagDto[]

    
    @IsOptional()
    @IsInt()
    sortOrder: number
    
  
}

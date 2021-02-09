import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsBoolean, IsIn, IsInt, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { ID } from "src/types";
import { LocalePageTemplateDto } from "./locale-page-template.dto";

export class PageTemplateFieldDto {

    @IsOptional()
    @IsInt()
    id: ID

    @IsString()
    name: string;

    @IsString()
    var_name: string;

    @IsString()
    type: string;

    @IsBoolean()
    required: boolean;

    @IsOptional()
    @IsBoolean()
    comment: string;

    @IsOptional()
    @IsObject()
    settings: any

}

export class CreatePageTemplateDto {

  
    @IsString()
    slug: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => PageTemplateFieldDto)
    fields: PageTemplateFieldDto[]

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LocalePageTemplateDto)
    locale: LocalePageTemplateDto[]


}

import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmptyObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { UpdatePageTemplateDto } from "src/internal";
import { LocalePageDto } from "./locale-page.dto";

export class CreatePageDto {

    @IsString()
    slug: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LocalePageDto)
    locale: LocalePageDto[]

    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => UpdatePageTemplateDto)
    template: UpdatePageTemplateDto
}

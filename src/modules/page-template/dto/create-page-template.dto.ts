import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsOptional, IsString, ValidateNested } from "class-validator";

class PageTemplateField {
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
    settings: any

}

export class CreatePageTemplateDto {

    @IsString()
    name: string;

    @IsString()
    slug: string;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => PageTemplateField)
    fields: PageTemplateField[]

}

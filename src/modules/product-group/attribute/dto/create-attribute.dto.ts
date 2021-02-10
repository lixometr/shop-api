import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { LocaleAttributeDto } from "./locale-attribute.dto";

export class CreateAttributeDto {

    @IsString()
    slug: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => LocaleAttributeDto)
    locale: LocaleAttributeDto[];
    

    @IsOptional()
    @IsInt()
    sortOrder: number
}

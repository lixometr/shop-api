import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmptyObject, IsString, ValidateNested } from "class-validator";
import { UpdateAttributeDto } from "src/internal";
import { LocaleAttributeValueDto } from "./locale-attribute-value.dto";

export class CreateAttributeValueDto {
    @IsString()
    slug: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LocaleAttributeValueDto)
    locale: LocaleAttributeValueDto[];
    
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => UpdateAttributeDto)
    attribute: UpdateAttributeDto

}

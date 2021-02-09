import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsInt, IsNotEmptyObject, IsString, ValidateNested } from "class-validator";
import { IdDto } from "src/helpers";
import { UpdateAttributeDto } from "src/internal";
import { ID } from "src/internal";
import { LocaleAttributeValueDto } from "./locale-attribute-value.dto";

export class CreateAttributeValueDto {
    @IsString()
    slug: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LocaleAttributeValueDto)
    locale: LocaleAttributeValueDto[];
    
    // @IsNotEmptyObject()
    // @ValidateNested()
    // @Type(() => IdDto)
    // attribute: IdDto

    @IsInt()
    attributeId: ID
}

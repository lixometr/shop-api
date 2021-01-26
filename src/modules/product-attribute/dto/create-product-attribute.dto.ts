import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, ValidateNested } from "class-validator";
import { Attribute, UpdateAttributeDto } from "src/internal";
import { UpdateAttributeValueDto } from "src/internal";
import { UpdateProductDto } from "src/internal";

export class CreateProductAttributeDto {

    @IsObject()
    @ValidateNested()
    @Type(() => UpdateAttributeDto)
    attr: UpdateAttributeDto

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => UpdateAttributeValueDto)
    attrValues: UpdateAttributeValueDto[]


    @IsObject()
    @ValidateNested()
    @Type(() => UpdateProductDto)
    product: UpdateProductDto
}

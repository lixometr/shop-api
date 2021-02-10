import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, ValidateNested } from "class-validator";
import { IdDto } from "src/helpers";
import { Attribute, ID, UpdateAttributeDto } from "src/internal";

export class CreateProductAttributeDto {

    @IsOptional()
    @IsInt()
    id: ID;

    @IsObject()
    @ValidateNested()
    @Type(() => IdDto)
    attr: IdDto

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => IdDto)
    attrValues: IdDto[]


    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => IdDto)
    product: IdDto

    @IsOptional()
    @IsInt()
    sortOrder: number
}

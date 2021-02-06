import { Type } from "class-transformer";
import {  IsInt, IsString, ValidateNested } from "class-validator";
import { ID } from "src/types";

class Values {
    @IsString()
    name: string
}
export class LocaleProductOptionDto {

    @IsInt()
    localeId: ID;

    @ValidateNested()
    @Type(() => Values)
    values: Values;
}
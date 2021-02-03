import { Type } from "class-transformer";
import { IsInt, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { ID } from "src/internal";

class Values {
    @IsString()
    name: string;

    @IsOptional()
    @IsObject()
    values: object;
}
export class LocalePageDto {

    @ValidateNested({ each: true })
    @Type(() => Values)
    values: Values;

    @IsInt()
    localeId: ID;

}

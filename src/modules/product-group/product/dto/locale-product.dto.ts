import { Type } from "class-transformer";
import { IsInt, IsNotEmptyObject, IsObject, IsString, ValidateNested } from "class-validator";
import { ID } from "src/internal";

class Values {
    @IsString()
    name: string;
    @IsString()
    description: string;
}
export class LocaleProductDto {
    
    @IsNotEmptyObject()
    @ValidateNested({ each: true })
    @Type(() => Values)
    values: Values;
    @IsInt()
    localeId: ID;

}

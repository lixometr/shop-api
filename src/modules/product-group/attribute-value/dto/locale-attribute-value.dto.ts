import { Type } from "class-transformer";
import { IsInt, IsObject, IsString, ValidateNested } from "class-validator";
import { ID } from "src/internal";

class Values {
    @IsString()
    name: string;
    
}
export class LocaleAttributeValueDto {
    
    @IsObject()
    @ValidateNested({ each: true })
    @Type(() => Values)
    values: Values;

    @IsInt()
    localeId: ID;

}

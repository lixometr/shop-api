import { Type } from "class-transformer";
import { IsInt, IsString, ValidateNested } from "class-validator";
import { ID } from "src/internal";

class Values {
    @IsString()
    name: string;
}
export class LocaleCurrencyDto {
    
    @ValidateNested({ each: true })
    @Type(() => Values)
    values: Values;
    @IsInt()
    localeId: ID;

}

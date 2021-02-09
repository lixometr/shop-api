import { Type } from "class-transformer";
import { IsInt, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { ID } from "src/internal";


export class LocaleAttributeDto {
    @IsOptional()
    @IsInt()
    id: ID;
    
    @IsString()
    name: string;
   
    @IsInt()
    localeId: ID;

}

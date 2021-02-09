import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { ID, SeoDto } from "src/internal";

export class CreateLocalePromocodeDto {
    @IsOptional()
    id: ID;

    @IsString()
    name: string;

    @IsInt()
    localeId: ID;


}
import { IsInt,  IsOptional,  IsString } from "class-validator";
import { ID } from "src/internal";


export class LocalePageTemplateDto {

    @IsOptional()
    @IsInt()
    id: ID

    @IsString()
    name: string;

    @IsInt()
    localeId: ID;

}

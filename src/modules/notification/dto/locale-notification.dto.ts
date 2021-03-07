import { IsInt, IsOptional, IsString } from "class-validator";
import { ID } from "src/internal";

export class LocaleNotificationLocaleDto {
    @IsOptional()
    @IsInt()
    id: ID
    
    @IsInt()
    localeId: ID;
    
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    text: string

    @IsOptional()
    @IsString()
    link: string

    @IsOptional()
    @IsString()
    date: Date
}

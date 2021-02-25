import { IsString } from "class-validator";

export class WidgetModelDto {
    // locale: 
    locale: any
    values: any;

    @IsString()
    slug: string
}
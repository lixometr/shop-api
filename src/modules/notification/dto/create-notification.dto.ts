import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, ValidateNested } from "class-validator";
import { LocaleNotificationLocaleDto } from "./locale-notification.dto";

export class CreateNotificationDto {
    
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LocaleNotificationLocaleDto)
    locale: LocaleNotificationLocaleDto[]
}

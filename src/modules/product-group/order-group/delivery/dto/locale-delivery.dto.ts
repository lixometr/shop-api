import { IsInt, IsOptional, IsString } from "class-validator";
import { ID } from "src/internal";

export class LocaleDeliveryDto {
    @IsOptional()
    @IsInt()
    id: ID;

    @IsOptional()
    @IsString()
    deliveryTime: string

    @IsOptional()
    @IsString()
    address: string;

    @IsInt()
    localeId: ID;
}
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsEnum, IsOptional, IsString, ValidateNested } from "class-validator";
import { DeliveryTypes } from "../delivery.types";
import { CreateDeliveryPriceDto } from "./create-delivery-price.dto";
import { LocaleDeliveryDto } from "./locale-delivery.dto";

export class CreateDeliveryDto {

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateDeliveryPriceDto)
    prices: CreateDeliveryPriceDto[];


    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LocaleDeliveryDto)
    locale: LocaleDeliveryDto[]

    @IsEnum(DeliveryTypes)
    type: DeliveryTypes

    @IsOptional()
    @IsString()
    apiKey: string
}

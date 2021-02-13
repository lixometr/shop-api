import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNotEmptyObject, IsNumber, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateOrderProductDto, IdDto } from "src/internal";
import { CreateOrderCurrencyDto } from "./create-order-currency.dto";
import { CreateOrderDeliveryTypeDto } from "./create-order-delivery-type.dto";
import { CreateOrderInfoDto } from "./create-order-info.dto";
import { CreateOrderLocaleDto } from "./create-order-locale.dto";
import { CreateOrderPaymentTypeDto } from "./create-order-payment-type.dto";
import { CreateOrderPromocodeDto } from "./create-order-promocode.dto";
import { CreateOrderUserDto } from "./create-order-user.dto";

export class CreateOrderDto {

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateOrderProductDto)
    products: CreateOrderProductDto[]

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateOrderPromocodeDto)
    promocode: CreateOrderPromocodeDto

    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateOrderDeliveryTypeDto)
    deliveryType: CreateOrderDeliveryTypeDto

    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateOrderPaymentTypeDto)
    orderType: CreateOrderPaymentTypeDto

    @IsObject()
    @ValidateNested()
    @Type(() => CreateOrderCurrencyDto)
    currency: CreateOrderCurrencyDto

    @IsObject()
    @ValidateNested()
    @Type(() => CreateOrderLocaleDto)
    locale: CreateOrderLocaleDto

    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => CreateOrderInfoDto)
    info: CreateOrderInfoDto

    @IsObject()
    @IsNotEmptyObject()
    @Type(() => CreateOrderUserDto)
    user: CreateOrderUserDto

    @IsString()
    orderId: string

    @IsOptional()
    @IsString()
    comment: string

    @IsNumber()
    totalPrice: number

}

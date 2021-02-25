import { IsInt, IsNumber, IsOptional } from "class-validator";
import { ID } from "src/internal";

export class CreateDeliveryPriceDto {
    @IsOptional()
    @IsInt()
    id: ID;
    
    @IsInt()
    currencyId: ID;

    @IsNumber()
    price: number;

}
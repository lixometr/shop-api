import { IsInt, IsString } from "class-validator";
import { ID, SLUG } from "src/types";

export class CreateOrderCurrencyDto {
    @IsInt()
    id: ID
    
    @IsString()
    name: string

    @IsString()
    slug: string

    @IsString()
    sign: string;

    @IsString()
    iso: string;
}
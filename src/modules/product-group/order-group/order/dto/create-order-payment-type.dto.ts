import { IsInt, IsString } from "class-validator";
import { ID } from "src/internal";

export class CreateOrderPaymentTypeDto {
    @IsInt()
    id: ID

    @IsString()
    name: string
}
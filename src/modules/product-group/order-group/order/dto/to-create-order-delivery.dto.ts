import { IsInt, IsOptional, IsString } from "class-validator";
import { ID } from "src/internal";

export class ToCreateOrderDeliveryDto {
    @IsInt()
    id: ID

    @IsOptional()
    @IsString()
    type: string
}
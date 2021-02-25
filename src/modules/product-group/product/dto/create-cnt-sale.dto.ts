import { IsInt, IsOptional } from "class-validator";
import { ID } from "src/internal";

export class CreateCntSale {
    @IsInt()
    @IsOptional()
    id: ID

    @IsInt()
    sale: number

    @IsInt()
    cnt: number
}
import { IsIn, IsInt, IsOptional } from "class-validator";
import { ID } from "src/internal";

export class CreateKitProductDto {
    @IsOptional()
    @IsInt()
    id: ID

    @IsInt()
    productId: ID

    @IsOptional()
    @IsInt()
    sortOrdder: ID
}
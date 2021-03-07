import { IsInt, IsOptional } from "class-validator";
import { ID } from "src/internal";

export class IdDto {
    @IsInt()
    id: ID

    @IsOptional()
    @IsInt()
    sortOrder: number
}
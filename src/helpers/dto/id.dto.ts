import { IsInt } from "class-validator";
import { ID } from "src/internal";

export class IdDto {
    @IsInt()
    id: ID
}
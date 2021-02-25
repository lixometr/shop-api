import { IsOptional, IsString } from "class-validator";
import { ID } from "src/internal";

export class CreateProductDescription {
    @IsOptional()
    id: ID

    @IsString()
    tab: string

    @IsString()
    content: string
}
import { IsInt, IsString } from "class-validator";
import { ID, SLUG } from "src/internal";

export class CreateOrderLocaleDto {
    @IsInt()
    id: ID
    
    @IsString()
    name: string

    @IsString()
    slug: SLUG
}
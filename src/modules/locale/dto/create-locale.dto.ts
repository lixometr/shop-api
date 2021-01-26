import { IsString } from "class-validator";

export class CreateLocaleDto {
    @IsString()
    name: string;

    @IsString()
    slug: string;
}

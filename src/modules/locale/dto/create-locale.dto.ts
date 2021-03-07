import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateLocaleDto {
    @IsString()
    name: string;

    @IsString()
    slug: string;

    @IsOptional()
    @IsString()
    iso: string

    @IsOptional()
    @IsInt()
    sortOrder: number
}

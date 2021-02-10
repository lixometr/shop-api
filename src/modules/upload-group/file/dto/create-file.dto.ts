import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateFileDto {

    @IsOptional()
    @IsString()
    path: string;

    @IsOptional()
    @IsString()
    url: string;

    // image.png
    @IsString()
    name: string;
    
    @IsOptional()
    @IsInt()
    sortOrder: number
}

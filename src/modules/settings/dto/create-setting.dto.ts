import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSettingDto {
    
    @IsString()
    name: string;

    @IsString()
    slug: string;
    
    @IsNotEmpty()
    value: any;

    @IsOptional()
    @IsInt()
    sortOrder: number
}

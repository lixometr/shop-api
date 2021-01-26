import { IsNotEmpty, IsString } from "class-validator";

export class CreateSettingDto {
    @IsString()
    name: string;
    @IsString()
    slug: string;
    
    @IsNotEmpty()
    value: any;
}

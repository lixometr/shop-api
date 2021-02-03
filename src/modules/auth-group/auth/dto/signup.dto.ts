import { IsSemVer, IsString, Length, Min } from "class-validator";
import { AppConfig } from "src/config";
import { CreateUserDto } from "src/internal";


export class SignupDto extends CreateUserDto {
   
    @IsString()
    @Length(AppConfig.get<number>('user.passwordMinLength'))
    password: string;
}
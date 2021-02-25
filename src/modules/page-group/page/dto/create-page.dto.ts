import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsEnum, IsInt, IsNotEmptyObject, IsOptional, IsString, ValidateNested } from "class-validator";
import {  SeoDto } from "src/internal";
import { ID } from "src/internal";
import { PublishStatus } from "src/types";
import { LocalePageDto } from "./locale-page.dto";

export class CreatePageDto {

    @IsString()
    slug: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LocalePageDto)
    locale: LocalePageDto[]

    @IsInt()
    templateId: ID

    @IsOptional()
    @IsEnum(PublishStatus)
    status: PublishStatus
    
    @IsOptional()
    @IsInt()
    sortOrder: number
}

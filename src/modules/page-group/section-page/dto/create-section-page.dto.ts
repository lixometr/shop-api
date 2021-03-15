import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsEnum, IsIn, IsInt, IsNotEmptyObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { IdDto,  PublishStatus} from "src/internal";
import { ID } from "src/types";
import { LocaleSectionPageDto } from "./locale-section-page.dto";

export class CreateSectionPageDto {

    @IsString()
    slug: string;

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LocaleSectionPageDto)
    locale: LocaleSectionPageDto[]

    @IsOptional()
    @IsEnum(PublishStatus)
    status: PublishStatus
    

    @IsInt()
    sectionId: ID

    @IsOptional()
    @IsInt()
    sortOrder: number

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => IdDto)
    tags: IdDto[]
}

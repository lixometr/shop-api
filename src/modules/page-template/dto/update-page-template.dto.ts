import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional } from 'class-validator';
import { ID } from 'src/internal';
import { CreatePageTemplateDto } from './create-page-template.dto';

export class UpdatePageTemplateDto extends PartialType(CreatePageTemplateDto) {
    @IsOptional()
    @IsInt()
    id: ID;
}

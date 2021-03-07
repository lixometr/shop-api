import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { ID } from 'src/internal';
import { CreateSectionTagDto } from './create-section-tag.dto';

export class UpdateSectionTagDto extends PartialType(CreateSectionTagDto) {

}

import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional } from 'class-validator';
import { ID } from 'src/internal';
import { CreateSectionDto } from './create-section.dto';

export class UpdateSectionDto extends PartialType(CreateSectionDto) {
   
}

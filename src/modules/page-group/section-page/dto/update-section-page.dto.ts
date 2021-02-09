import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional } from 'class-validator';
import { ID } from 'src/internal';
import { CreateSectionPageDto } from './create-section-page.dto';

export class UpdateSectionPageDto extends PartialType(CreateSectionPageDto) {
  
}

import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional } from 'class-validator';
import { ID } from 'src/internal';
import { CreateAttributeValueDto } from './create-attribute-value.dto';

export class UpdateAttributeValueDto extends PartialType(CreateAttributeValueDto) {
    @IsOptional()
    @IsInt()
    id: ID
}

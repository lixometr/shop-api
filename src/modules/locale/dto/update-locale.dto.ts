import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { ID } from 'src/internal';
import { CreateLocaleDto } from './create-locale.dto';

export class UpdateLocaleDto extends PartialType(CreateLocaleDto) {
    @IsOptional()
    id: ID
}

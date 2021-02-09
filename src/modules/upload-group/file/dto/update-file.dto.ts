import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { ID } from 'src/types';
import { CreateFileDto } from './create-file.dto';

export class UpdateFileDto extends PartialType(CreateFileDto) {
    
}

import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { ID } from 'src/internal';
import { CreateImageDto } from './create-image.dto';

export class UpdateImageDto extends PartialType(CreateImageDto) {
    
    @IsInt()
    id: ID
}

import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { ID } from 'src/internal';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    
}

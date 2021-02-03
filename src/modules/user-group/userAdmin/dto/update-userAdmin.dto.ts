import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { ID } from 'src/internal';
import { CreateUserAdminDto } from '../index';

export class UpdateUserAdminDto extends PartialType(CreateUserAdminDto) {
    @IsOptional()
    id: ID;
}

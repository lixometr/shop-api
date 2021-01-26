import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { ID } from 'src/internal';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsOptional()
    id: ID;
}

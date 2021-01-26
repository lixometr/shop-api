import { PartialType } from '@nestjs/mapped-types';
import { IsOptional } from 'class-validator';
import { ID } from 'src/internal';
import { CreateProductTagDto } from './create-product-tag.dto';

export class UpdateProductTagDto extends PartialType(CreateProductTagDto) {
    @IsOptional()
    id: ID;
}

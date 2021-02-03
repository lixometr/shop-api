import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional } from 'class-validator';
import { ID } from 'src/internal';
import { CreateProductAttributeDto } from './create-product-attribute.dto';

export class UpdateProductAttributeDto extends PartialType(CreateProductAttributeDto) {
    @IsOptional()
    @IsInt()
    id: ID;

}

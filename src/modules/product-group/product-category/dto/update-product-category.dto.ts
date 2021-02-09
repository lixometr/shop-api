import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional } from 'class-validator';
import { CreateProductCategoryDto } from '../../../index';
import { ID } from "src/internal"
export class UpdateProductCategoryDto extends PartialType(CreateProductCategoryDto) {

}

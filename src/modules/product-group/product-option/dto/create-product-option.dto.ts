import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ID } from 'src/internal';
import {
  ProductOptionCostTypes,
  ProductOptionTypes,
} from '../product-option.types';
import { CreateProductOptionValueDto } from './create-product-option-value.dto';
import { LocaleProductOptionDto } from './locale-product-option.dto';
export class CreateProductOptionDto {

  @IsOptional()
  @IsInt()
  id: ID

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => LocaleProductOptionDto)
  locale: LocaleProductOptionDto[];

  @IsEnum(ProductOptionTypes)
  type: ProductOptionTypes;

  @IsOptional()
  @IsEnum(ProductOptionCostTypes)
  cost_type: ProductOptionCostTypes;


  // @IsString()
  // varName: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateProductOptionValueDto)
  values: CreateProductOptionValueDto[]

  @IsOptional()
  @IsObject()
  settings: any;

  @IsOptional()
  @IsString()
  comment: string;

  @IsOptional()
  @IsInt()
  sortOrder: number
}

import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import {
  ProductOptionCostTypes,
  ProductOptionTypes,
} from '../product-option.types';
import { CreateProductOptionValueDto } from './create-product-option-value.dto';
import { LocaleProductOptionDto } from './locale-product-option.dto';
export class CreateProductOptionDto {

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
}

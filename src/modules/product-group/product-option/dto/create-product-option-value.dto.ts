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

import { CreateProductOptionValuePriceDto } from './create-product-option-value-price.dto';
import { LocaleProductOptionValueDto } from './locale-product-option-value.dto';
export class CreateProductOptionValueDto {
    
  @IsOptional()
  @IsInt()
  id: ID;
  
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => LocaleProductOptionValueDto)
  locale: LocaleProductOptionValueDto[];

 
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateProductOptionValuePriceDto)
  prices: CreateProductOptionValuePriceDto[];

  @IsOptional()
  @IsInt()
  sortOrder: number
}

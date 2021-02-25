import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ID, SeoDto } from 'src/internal';
import { CreateProductDescription } from './create-product-description';

export class LocaleProductDto {
  @IsOptional()
  @IsInt()
  id: ID;
  
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({each: true})
  @Type(() => CreateProductDescription)
  description: CreateProductDescription[];

  @IsInt()
  localeId: ID;

  @IsOptional()
  @ValidateNested()
  @Type(() => SeoDto)
  seo: SeoDto
}

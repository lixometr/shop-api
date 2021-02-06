import { Type } from 'class-transformer';
import { IsString, IsInt, IsOptional, IsArray, ValidateNested, IsEnum, ArrayNotEmpty } from 'class-validator';
import { UpdateProductAttributeDto } from 'src/modules/product-group/product-attribute/dto/update-product-attribute.dto';
import { UpdateProductCategoryDto } from 'src/modules/product-group/product-category/dto/update-product-category.dto';
import { UpdateProductTagDto } from 'src/modules/product-group/product-tag/dto/update-product-tag.dto';
import { UpdateImageDto } from 'src/modules/upload-group/image/dto/update-image.dto';
import { CreateProductOptionDto } from '../../product-option/dto/create-product-option.dto';
import { ProductStatus } from '../product.types';
import { ProductPriceDto } from './create-product-price.dto';
import { LocaleProductDto } from './locale-product.dto';
export class CreateProductDto {

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LocaleProductDto)
    locale: LocaleProductDto[];
    

    @IsString()
    slug: string;
    

    @ArrayNotEmpty()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => ProductPriceDto)
    prices: ProductPriceDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateProductOptionDto)
    options: CreateProductOptionDto[]
  
    @IsOptional()
    @ValidateNested()
    @Type(() => UpdateImageDto)
    defaultImage: UpdateImageDto

    @IsOptional()
    @ValidateNested({each: true})
    @Type(() => UpdateImageDto)
    images: UpdateImageDto[]

    @IsOptional()
    @IsEnum(ProductStatus)
    status: ProductStatus;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UpdateProductAttributeDto)
    attributes: UpdateProductAttributeDto[]


    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UpdateProductTagDto)
    tags: UpdateProductTagDto[]

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => UpdateProductCategoryDto)
    category: UpdateProductCategoryDto[]
}

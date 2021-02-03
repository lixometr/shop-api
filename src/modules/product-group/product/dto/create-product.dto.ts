import { Type } from 'class-transformer';
import { IsString, IsInt, IsOptional, IsArray, ValidateNested, IsEnum, ArrayNotEmpty } from 'class-validator';
import { CreateProductAttributeDto } from 'src/modules/product-group/product-attribute/dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from 'src/modules/product-group/product-attribute/dto/update-product-attribute.dto';
import { ProductAttribute } from 'src/modules/product-group/product-attribute/entities/product-attribute.entity';
import { UpdateProductCategoryDto } from 'src/modules/product-group/product-category/dto/update-product-category.dto';
import { UpdateProductTagDto } from 'src/modules/product-group/product-tag/dto/update-product-tag.dto';
import { ProductStatus } from '../product.types';
import { LocaleProductDto } from './locale-product.dto';
export class CreateProductDto {

    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => LocaleProductDto)
    locale: LocaleProductDto[];
    

    @IsString()
    slug: string;

    @IsInt()
    price: number;

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

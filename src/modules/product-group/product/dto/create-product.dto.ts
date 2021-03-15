import { Type } from 'class-transformer';
import { IsString, IsInt, IsOptional, IsArray, ValidateNested, IsEnum, ArrayNotEmpty, IsBoolean } from 'class-validator';
import { IdDto } from 'src/internal';
import { CreateProductAttributeDto } from 'src/internal';
import { CreateProductOptionDto } from '../../product-option/dto/create-product-option.dto';
import { CreateProductVariationDto } from '../../product-variation/dto/create-product-variation.dto';
import { ProductStatus, ProductType } from '../product.types';
import { CreateCntSale } from './create-cnt-sale.dto';
import { CreateKitProductDto } from './create-kit-product.dto';
import { CreateProductPriceDto } from './create-product-price.dto';
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
    @ValidateNested({ each: true })
    @Type(() => CreateProductPriceDto)
    prices: CreateProductPriceDto[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateProductOptionDto)
    options: CreateProductOptionDto[]

    @IsOptional()
    @ValidateNested()
    @Type(() => IdDto)
    defaultImage: IdDto

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IdDto)
    images: IdDto[]

    @IsOptional()
    @IsEnum(ProductStatus)
    status: ProductStatus;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateProductAttributeDto)
    attributes: CreateProductAttributeDto[]


    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IdDto)
    tags: IdDto[]

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IdDto)
    category: IdDto[]

    @IsOptional()
    @IsInt()
    sortOrder: number;

    @IsOptional()
    @IsEnum(ProductType)
    type: ProductType

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateProductVariationDto)
    variations: CreateProductVariationDto[]

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateKitProductDto)
    kitProducts: CreateKitProductDto[]
    
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => IdDto)
    attendProducts: IdDto[]

    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreateCntSale)
    cntSale: CreateCntSale[]

    @IsOptional()
    @IsBoolean()
    showTags: boolean

    @IsOptional()
    @IsString()
    sku: string;


}

import { Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateImageDto, CreateProductOptionDto, CreateProductVariationDto, ID, IdDto, ProductStatus, ProductType } from "src/internal";

export class CreateOrderProductItemDto {

    @IsInt()
    id: ID
    
    @IsString()
    name: string

    @IsString()
    slug: string;

    @IsNumber()
    price: number

    @IsOptional()
    @IsNumber()
    oldPrice: number

    @IsOptional()
    @IsNumber()
    sale: number

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateProductOptionDto)
    options: CreateProductOptionDto[]

    @IsOptional()
    @ValidateNested()
    @Type(() => CreateImageDto)
    defaultImage: CreateImageDto

    @IsEnum(ProductStatus)
    status: ProductStatus;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => IdDto)
    category: IdDto[]

    @IsEnum(ProductType)
    type: ProductType

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateProductVariationDto)
    variations: CreateProductVariationDto[]

    @IsString()
    sku: string;


}

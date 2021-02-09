import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from "class-validator";
import { ID } from "src/internal";
import { ProductReviewStatus } from "../product-review.types";

export class CreateProductReviewDto {

    @IsInt()
    productId: ID

    @IsInt()
    userId: ID

    @Min(0)
    @Max(5)
    @IsInt()
    rating: number

    @IsString()
    content: string;
    
    @IsString()
    title: string;

    // @IsOptional()
    // @IsEnum(ProductReviewStatus)
    // status: ProductReviewStatus
}

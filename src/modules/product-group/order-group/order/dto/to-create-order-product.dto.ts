import { Type } from "class-transformer"
import { IsNotEmptyObject, IsObject, ValidateNested, IsOptional, IsInt } from "class-validator"
import { ID, CartProductActiveOptions, IdDto} from "src/internal"

export class ToCreateOrderProductDto {

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => IdDto)
    product: IdDto
    
    @IsOptional()
    @IsObject()
    @Type(() => CartProductActiveOptions)
    activeOptions: CartProductActiveOptions

    @IsInt()
    cnt: number

    @IsOptional()
    @IsInt()
    activeVariation: ID
}
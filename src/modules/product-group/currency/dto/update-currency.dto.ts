import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional } from 'class-validator';
import { ID } from 'src/types';
import { CreateCurrencyDto } from './create-currency.dto';

export class UpdateCurrencyDto extends PartialType(CreateCurrencyDto) {
    
    @IsOptional()
    @IsInt()
    id: ID;
}

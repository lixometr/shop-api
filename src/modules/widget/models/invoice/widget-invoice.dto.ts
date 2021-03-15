import { Type } from "class-transformer";
import { IsObject, IsString, ValidateNested } from "class-validator";
import { WidgetModelDto } from "../widget.model.dto";
class WidgetInvoiceValues {
    
    @IsString()
    company: string

    @IsString()
    inn: string

    @IsString()
    ogrn: string

    @IsString()
    kpp: string

    // @IsString()
    // bank: string

    // @IsString()
    // bik: string

    // @IsString()
    // rc: string
    
    // @IsString()
    // kc: string

}
export class WidgetInvoiceDto extends WidgetModelDto {
    @IsObject()
    @ValidateNested()
    @Type(() => WidgetInvoiceValues)
    values: WidgetInvoiceValues
}
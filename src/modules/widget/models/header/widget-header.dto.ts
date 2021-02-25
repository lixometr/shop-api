import { Type } from "class-transformer";
import { IsObject, IsString, ValidateNested } from "class-validator";
import { WidgetModelDto } from "../widget.model.dto";
class WidgetHeaderValues {
    @IsString()
    logo: string

}
export class WidgetHeaderDto extends WidgetModelDto {
    @IsObject()
    @ValidateNested()
    @Type(() => WidgetHeaderValues)
    values: WidgetHeaderValues
}
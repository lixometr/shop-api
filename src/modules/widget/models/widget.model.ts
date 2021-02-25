import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Widget } from "../entities/widget.entity";
import { WidgetModelDto } from "./widget.model.dto";

export class WidgetModel {
    private widget?: Widget
    public ItemDto = WidgetModelDto
    constructor(params: { widget: Widget }) {
        this.widget = params && params.widget
    }
    async validate(plain: any) {
        const itemEntity = plainToClass<WidgetModelDto, any>(this.ItemDto, plain)
        const errors = await validate(itemEntity, { whitelist: true })
        if (errors && errors.length) {
            const getErrorMessages = (err: ValidationError): Array<string> => {
                let errArray = []

                if (err.children.length) {
                    const childErrors = err.children.reduce((arr, child) => {
                        return arr.concat(getErrorMessages(child,))
                    }, [])
                    errArray = errArray.concat(childErrors)

                }
                if (err.constraints) {
                    const messages = Object.keys(err.constraints).map(key => err.constraints[key])

                    errArray = errArray.concat(messages)
                }
                return errArray
            }
            throw errors.reduce((arr, error) => {
                return arr.concat(getErrorMessages(error))
            }, [])
        }
        return itemEntity
    }
    toJSON() {
        return this.widget
    }
}
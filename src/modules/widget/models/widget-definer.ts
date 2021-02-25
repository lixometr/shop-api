import { WidgetModels } from "../widget.constants"
import { WidgetModel } from "./widget.model"

export class WidgetDefiner {
    private slug: string
    constructor(slug: string) {
        this.slug = slug
    }

    getModel(): new (...args: any) => WidgetModel {
        return WidgetModels[this.slug]
    }

}
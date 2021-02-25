import { DefaultRepository } from "src/blueprints";
import { EntityRepository } from "typeorm";
import { Widget } from "../entities/widget.entity";
import { WidgetName } from "../widget.constants";

@EntityRepository(Widget)
export class WidgetRepository extends DefaultRepository<Widget>{
    public name = WidgetName
    
}
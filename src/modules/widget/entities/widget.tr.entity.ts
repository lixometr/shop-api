import { EntityTranslationBlueprint } from "src/blueprints";
import { LOCALE_REL_OPTIONS } from "src/constants";
import { Column, Entity, ManyToOne } from "typeorm";
import { Widget } from "./widget.entity";

@Entity()
export class WidgetLocale extends EntityTranslationBlueprint {

    @ManyToOne(() => Widget, widget => widget.locale, LOCALE_REL_OPTIONS)
    item: Widget;

    @Column('json', {nullable: true})
    localeValues: any;
}
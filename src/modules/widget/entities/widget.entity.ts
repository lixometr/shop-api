import { Expose } from "class-transformer";
import { EntityLocaleItemBlueprint } from "src/internal";
import { SerializeGroup } from "src/internal";
import { Column, Entity, OneToMany } from "typeorm";
import { WidgetLocale } from "./widget.tr.entity";

@Entity()
export class Widget extends EntityLocaleItemBlueprint {

    @Expose({ groups: [SerializeGroup.Admin] })
    @OneToMany(() => WidgetLocale, locale => locale.item, { cascade: true, eager: true })
    locale: WidgetLocale[]
    localeValues: any

    @Column('json', {nullable: true})
    values: any

}

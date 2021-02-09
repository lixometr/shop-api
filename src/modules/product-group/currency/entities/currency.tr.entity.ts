import { LOCALE_REL_OPTIONS } from "src/constants";
import { EntityTranslationBlueprint, ProductCategory } from "src/internal";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, Tree, TreeChildren, TreeParent } from "typeorm";
import { Currency } from "./currency.entity";

@Entity()
export class CurrencyLocale extends EntityTranslationBlueprint {

    @ManyToOne(() => Currency, item => item.locale, LOCALE_REL_OPTIONS)
    item: Currency;

    @Column()
    name: string

}

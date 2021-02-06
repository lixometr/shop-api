import { EntityTranslationBlueprint } from "src/internal";
import { LOCALE_REL_OPTIONS } from "src/constants";
import {  Entity, ManyToOne } from "typeorm";
import { Page } from "./page.entity";

@Entity({})
export class PageLocale extends EntityTranslationBlueprint {

    @ManyToOne(() => Page, pageLocale => pageLocale.locale, LOCALE_REL_OPTIONS)
    item: Page;

}

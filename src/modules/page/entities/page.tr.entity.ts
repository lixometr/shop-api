import { EntityTranslationBlueprint } from "src/blueprints/translation.entity";
import { LOCALE_REL_OPTIONS } from "src/constants";
import { ID } from "src/internal";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Page } from "./page.entity";

@Entity({})
export class PageLocale extends EntityTranslationBlueprint {

    @ManyToOne(() => Page, pageLocale => pageLocale.locale, LOCALE_REL_OPTIONS)
    item: Page;

}

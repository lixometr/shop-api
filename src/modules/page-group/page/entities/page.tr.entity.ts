import { EntitySeo, EntityTranslationBlueprint } from "src/internal";
import { LOCALE_REL_OPTIONS } from "src/constants";
import { Column, Entity, ManyToOne } from "typeorm";
import { Page } from "src/internal";

@Entity({})
export class PageLocale extends EntityTranslationBlueprint {

    @ManyToOne(() => Page, pageLocale => pageLocale.locale, LOCALE_REL_OPTIONS)
    item: Page;

    @Column()
    name: string;

    @Column({ type: 'json', nullable: true })
    values: any

    @Column(type => EntitySeo)
    seo: EntitySeo
    
}

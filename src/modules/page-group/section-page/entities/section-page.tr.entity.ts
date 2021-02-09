import { EntitySeo, EntityTranslationBlueprint } from "src/internal";
import { LOCALE_REL_OPTIONS } from "src/constants";
import { Column, Entity, ManyToOne } from "typeorm";
import { SectionPage } from "src/internal";

@Entity({})
export class SectionPageLocale extends EntityTranslationBlueprint {

    @ManyToOne(() => SectionPage, pageLocale => pageLocale.locale, LOCALE_REL_OPTIONS)
    item: SectionPage;

    @Column()
    name: string;

    @Column({ type: 'json', nullable: true })
    values: any

    @Column(type => EntitySeo)
    seo: EntitySeo
}

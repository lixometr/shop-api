import { EntitySeo, EntityTranslationBlueprint } from "src/internal";
import { LOCALE_REL_OPTIONS } from "src/constants";
import { Column, Entity, ManyToOne } from "typeorm";
import { Section } from "./section.entity";

@Entity({})
export class SectionLocale extends EntityTranslationBlueprint {

    @ManyToOne(() => Section, secLocale => secLocale.locale, LOCALE_REL_OPTIONS)
    item: Section;

    @Column()
    name: string;

    @Column({ type: 'json', nullable: true })
    values: any

    @Column(type => EntitySeo)
    seo: EntitySeo
}

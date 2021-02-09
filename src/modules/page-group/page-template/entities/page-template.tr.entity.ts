import { EntityTranslationBlueprint } from "src/internal";
import { LOCALE_REL_OPTIONS } from "src/constants";
import { Column, Entity, ManyToOne } from "typeorm";
import { PageTemplate } from "src/internal";

@Entity({})
export class PageTemplateLocale extends EntityTranslationBlueprint {

    @ManyToOne(() => PageTemplate, pageTemplate => pageTemplate.locale, LOCALE_REL_OPTIONS)
    item: PageTemplate;

    @Column()
    name: string;


}

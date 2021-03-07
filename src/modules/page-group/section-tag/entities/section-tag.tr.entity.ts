import { LOCALE_REL_OPTIONS } from "src/constants";
import { EntityTranslationBlueprint } from "src/internal";
import { SectionTag } from "src/internal";
import { ID } from "src/internal";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({})
export class SectionTagLocale extends EntityTranslationBlueprint {

    @ManyToOne(() => SectionTag, SectionTag => SectionTag.locale, LOCALE_REL_OPTIONS)
    item: SectionTag;

    @Column()
    name: string;
}

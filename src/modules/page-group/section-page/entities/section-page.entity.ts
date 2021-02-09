
import { Column, Entity, ManyToOne, OneToMany, } from 'typeorm';
import { SectionPageLocale } from "./section-page.tr.entity"
import { EntityLocaleItemBlueprint } from 'src/blueprints';
import { EntitySeo, Section } from 'src/internal';
import { DELETE_OPTIONS } from 'src/constants';
import { ID } from 'src/internal';
@Entity()
export class SectionPage extends EntityLocaleItemBlueprint {

    @OneToMany(() => SectionPageLocale, pageLocale => pageLocale.item, { cascade: true, eager: true })
    locale: SectionPageLocale[];

    name: string;

    values: any;

    @Column()
    sectionId: ID

    @ManyToOne(() => Section, section => section.sectionPages, DELETE_OPTIONS)
    section: Section

   
    
}


import { Column, Entity, ManyToOne, OneToMany, } from 'typeorm';
import { SectionPageLocale } from "./section-page.tr.entity"
import { EntityLocaleItemBlueprint } from 'src/blueprints';
import { EntitySeo, Section, SerializeGroup } from 'src/internal';
import { DELETE_OPTIONS } from 'src/constants';
import { ID } from 'src/internal';
import { Expose } from 'class-transformer';
@Entity()
export class SectionPage extends EntityLocaleItemBlueprint {

    @Expose({ groups: [SerializeGroup.Admin] })
    @OneToMany(() => SectionPageLocale, pageLocale => pageLocale.item, { cascade: true, eager: true })
    locale: SectionPageLocale[];

    name: string;

    values: any;

    @Column()
    sectionId: ID

    @ManyToOne(() => Section, section => section.sectionPages, DELETE_OPTIONS)
    section: Section

   
    
}

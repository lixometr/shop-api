import { Expose } from 'class-transformer';
import { EntityLocaleItemBlueprint, ProductTagLocale, SectionPage, SerializeGroup } from 'src/internal';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { SectionTagLocale } from './section-tag.tr.entity';

@Entity()
export class SectionTag extends EntityLocaleItemBlueprint {
   
    
    @Expose({ groups: [SerializeGroup.Admin] })
    @OneToMany(() => SectionTagLocale, productTagLocale => productTagLocale.item, { cascade: true, eager: true })
    locale: ProductTagLocale[];

    @ManyToMany(() => SectionPage, sectionPage => sectionPage.tags)
    products: SectionPage[]

}

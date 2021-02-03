import { Expose } from 'class-transformer';
import { CASCADE_NOT_INSERT } from 'src/constants';
import { EntityLocaleItemBlueprint, PageLocale } from 'src/internal';
import { Product } from 'src/internal';
import { PageTemplate } from 'src/internal';
import { ID, SerializeGroup } from 'src/types';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from 'typeorm';

@Entity()
export class Page extends EntityLocaleItemBlueprint {

    @OneToMany(() => PageLocale, pageLocale => pageLocale.item, { cascade: true, eager: true })
    locale: PageLocale[];

    @Column({ nullable: true })
    templateId: ID

    @Expose({ groups: [SerializeGroup.AdminFull] })
    @ManyToOne(() => PageTemplate, pageTemplate => pageTemplate.pages, { cascade: CASCADE_NOT_INSERT, onDelete: 'SET NULL', eager: true })
    template: PageTemplate
}

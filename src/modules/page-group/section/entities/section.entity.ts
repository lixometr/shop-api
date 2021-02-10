import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Expose } from 'class-transformer';
import { CASCADE_NOT_INSERT } from 'src/constants';
import { EntityLocaleItemBlueprint, EntitySeo, SectionLocale } from 'src/internal';
import { PageTemplate } from 'src/internal';
import { ID, SerializeGroup } from 'src/types';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { SectionPage } from '../../section-page';

@Entity()
export class Section extends EntityLocaleItemBlueprint {

    @Expose({ groups: [SerializeGroup.Admin] })
    @OneToMany(() => SectionLocale, pageLocale => pageLocale.item, { cascade: true, eager: true })
    locale: SectionLocale[];

    name: string;

    values: any;

    @Column({ nullable: true })
    templateId: ID

    @Expose({ groups: [SerializeGroup.AdminFull] })
    @ManyToOne(() => PageTemplate, pageTemplate => pageTemplate.pages, { cascade: CASCADE_NOT_INSERT, onDelete: 'SET NULL', eager: true })
    template: PageTemplate

    @OneToMany(() => SectionPage, sectionPage => sectionPage.section)
    sectionPages: SectionPage[]
  

    
}

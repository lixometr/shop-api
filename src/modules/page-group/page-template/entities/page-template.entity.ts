import {  EntityLocaleItemBlueprint, SerializeGroup } from 'src/internal';
import { Page } from 'src/internal';
import { Entity, Column, OneToMany, ManyToMany } from 'typeorm';
import { PageTemplateField } from 'src/internal';
import { PageTemplateLocale } from './page-template.tr.entity';
import { Expose } from 'class-transformer';

@Entity()
export class PageTemplate extends EntityLocaleItemBlueprint {

    @Expose({ groups: [SerializeGroup.Admin] })
    @OneToMany(() => PageTemplateLocale, pageTemplateLocale => pageTemplateLocale.item, { cascade: true, eager: true })
    locale: PageTemplateLocale[];
    name: string;

    @OneToMany(() => Page, page => page.template)
    pages: Page[]

    @Expose({groups: [SerializeGroup.AdminFull, SerializeGroup.Full]})
    @OneToMany(() => PageTemplateField, field => field.pageTemplate, {nullable: true, cascade: true, eager: true })
    fields: PageTemplateField[]
}

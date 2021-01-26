import { EntityItemBlueprint } from 'src/internal';
import { Product } from 'src/internal';
import { Page } from 'src/modules/page/entities/page.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { PageTemplateField } from './page-template-field.entity';

@Entity()
export class PageTemplate extends EntityItemBlueprint {

    @Column()
    name: string;

    @OneToMany(() => Page, page => page.template)
    pages: Page[]

    @OneToMany(() => PageTemplateField, field => field.pageTemplate, { cascade: true, eager: true })
    fields: PageTemplateField[]
}

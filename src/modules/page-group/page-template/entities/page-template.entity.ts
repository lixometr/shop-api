import { EntityItemBlueprint } from 'src/internal';
import { Page } from 'src/internal';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { PageTemplateField } from 'src/internal';

@Entity()
export class PageTemplate extends EntityItemBlueprint {

    @Column()
    name: string;

    @OneToMany(() => Page, page => page.template)
    pages: Page[]

    @OneToMany(() => PageTemplateField, field => field.pageTemplate, { cascade: true, eager: true })
    fields: PageTemplateField[]
}

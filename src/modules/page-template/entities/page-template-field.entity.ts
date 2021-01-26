import { EntityDefaultBlueprint } from 'src/blueprints';
import { DELETE_OPTIONS } from 'src/constants';
import { EntityItemBlueprint } from 'src/internal';
import { Product } from 'src/internal';
import { Page } from 'src/modules/page/entities/page.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { PageTemplate } from './page-template.entity';

@Entity()
export class PageTemplateField extends EntityDefaultBlueprint {

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    var_name: string;

    @Column({ nullable: false })
    type: string;

    @Column({ default: false })
    required: boolean;

    @Column({ nullable: true })
    comment: string;

    @Column({type: 'json', nullable: true})
    settings: any

    @ManyToOne(() => PageTemplate, pageTemplate => pageTemplate.fields, DELETE_OPTIONS)
    pageTemplate: PageTemplate

}

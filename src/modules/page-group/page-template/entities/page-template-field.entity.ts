import { EntityDefaultBlueprint } from 'src/internal';
import { DELETE_OPTIONS } from 'src/constants';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { PageTemplate } from 'src/internal';

@Entity()
export class PageTemplateField extends EntityDefaultBlueprint {

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    varName: string;

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

import { Expose } from 'class-transformer';
import { CASCADE_NOT_INSERT } from 'src/constants';
import { EntitySeo, RequestPayload } from 'src/internal';
import { EntityLocaleItemBlueprint, PageLocale } from 'src/internal';
import { PageTemplate } from 'src/internal';
import { ID, SerializeGroup } from 'src/internal';
import { PublishStatus } from 'src/internal';
import { Entity,  Column, OneToMany,  ManyToOne } from 'typeorm';

@Entity()
export class Page extends EntityLocaleItemBlueprint {

    @Expose({ groups: [SerializeGroup.Admin] })
    @OneToMany(() => PageLocale, pageLocale => pageLocale.item, { cascade: true, eager: true })
    locale: PageLocale[];

    name: string;

    values: any;

    @Column({ nullable: true })
    templateId: ID

    @Expose({ groups: [SerializeGroup.AdminFull] })
    @ManyToOne(() => PageTemplate, pageTemplate => pageTemplate.pages, { cascade: CASCADE_NOT_INSERT, onDelete: 'SET NULL', eager: true })
    template: PageTemplate

    @Column({default: PublishStatus.Published})
    status: PublishStatus
    
    async serialize( payload: RequestPayload) {
        // const items = await this.pageTemplateRepository.find()
        // console.log(items)
        // this.repo.findAll()
        return super.serialize( payload)
    }
}

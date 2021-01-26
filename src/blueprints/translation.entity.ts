import { ID, Locale } from "src/internal";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import * as _ from "lodash"
export class EntityTranslationBlueprint {

    @PrimaryGeneratedColumn()
    id: ID;

    @Column()
    localeId: ID;

    @ManyToOne(() => Locale, { nullable: false })
    locale: Locale;

    @Column({ type: 'json', nullable: false })
    values: any;

} 



import { LOCALE_REL_OPTIONS } from "src/constants";
import { AttributeValue, EntityTranslationBlueprint } from "src/internal";

import { Column,  Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AttributeValueLocale extends EntityTranslationBlueprint{

    @ManyToOne(() => AttributeValue, attributeValue => attributeValue.locale, LOCALE_REL_OPTIONS)
    item: AttributeValue;

    @Column()
    name: string
}

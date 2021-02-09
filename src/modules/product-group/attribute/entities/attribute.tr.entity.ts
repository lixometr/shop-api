import { LOCALE_REL_OPTIONS } from "src/constants";
import { Attribute, EntityTranslationBlueprint } from "src/internal";
import { ID } from "src/internal";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({})
export class AttributeLocale extends EntityTranslationBlueprint{

    @ManyToOne(() => Attribute, attribute => attribute.locale, LOCALE_REL_OPTIONS)
    item: Attribute;
    
    @Column()
    name: string;
   
}

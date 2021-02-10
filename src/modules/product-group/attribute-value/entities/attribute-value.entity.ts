import { Expose } from 'class-transformer';
import { EntityLocaleItemBlueprint } from 'src/blueprints';
import { DELETE_OPTIONS } from 'src/constants';
import { AttributeLocale, ProductAttribute, SerializeGroup } from 'src/internal';
import { Attribute } from 'src/internal';
import { ID } from 'src/internal';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { AttributeValueLocale } from './attribute-value.tr.entity';

@Entity()
export class AttributeValue extends EntityLocaleItemBlueprint {
    
    @Expose({ groups: [SerializeGroup.Admin] })
    @OneToMany(() => AttributeValueLocale, attributeValueLocale => attributeValueLocale.item, { cascade: true, eager: true })
    locale: AttributeValueLocale[];

    @ManyToMany(() => ProductAttribute, pAttr => pAttr.attrValues)
    productAttributes: ProductAttribute[]

    @Column()
    attributeId: ID;
    
    @ManyToOne(() => Attribute, attribute => attribute.values, DELETE_OPTIONS)
    attribute: Attribute
   
}

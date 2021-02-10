import { Expose } from 'class-transformer';
import { AttributeLocale, EntityLocaleItemBlueprint, SerializeGroup } from 'src/internal';
import { AttributeValue } from 'src/internal';
import { ProductAttribute } from 'src/internal';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Attribute extends EntityLocaleItemBlueprint {
   
    @Expose({ groups: [SerializeGroup.Admin] })
    @OneToMany(() => AttributeLocale, attributeLocale => attributeLocale.item, { cascade: true, eager: true })
    locale: AttributeLocale[];

    @OneToMany(() => ProductAttribute, pAttr => pAttr.attr)
    productAttribute: ProductAttribute
   
    @OneToMany(() => AttributeValue, attrValue => attrValue.attribute)
    values: AttributeValue[]
}

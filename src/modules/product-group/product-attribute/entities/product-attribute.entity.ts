import { EntityDefaultBlueprint, ID, Product } from "src/internal";
import { Attribute } from "src/internal";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { CASCADE_NOT_INSERT, DELETE_OPTIONS } from "src/constants"
import { AttributeValue } from "src/modules/product-group/attribute-value";
@Entity()
export class ProductAttribute extends EntityDefaultBlueprint {

    @Column()
    attrId: ID
    
    @ManyToOne(() => Attribute, attr => attr.productAttribute, { ...DELETE_OPTIONS, cascade: CASCADE_NOT_INSERT, eager: true })
    attr: Attribute

    @ManyToMany(() => AttributeValue, attrValue => attrValue.attribute, { ...DELETE_OPTIONS, cascade: CASCADE_NOT_INSERT, eager: true })
    @JoinTable()
    attrValues: AttributeValue[]

    @Column({default: true})
    showInProduct: boolean

    @ManyToOne(() => Product, product => product.attributes, DELETE_OPTIONS)
    product: Product
}

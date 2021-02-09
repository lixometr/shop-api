import { EntityDefaultBlueprint } from "src/blueprints"
import { DELETE_OPTIONS } from "src/constants"
import { Attribute, AttributeValue, ID } from "src/internal"
import { Column, Entity, ManyToOne } from "typeorm"
import { ProductVariation } from "./product-variation.entity"

@Entity()
export class ProductVariationAttributes extends EntityDefaultBlueprint {

    @Column()
    attrId: ID

    @ManyToOne(() => Attribute, DELETE_OPTIONS)
    attr: Attribute

    @Column()
    attrValueId: ID

    @ManyToOne(() => AttributeValue, DELETE_OPTIONS)
    attrValue: AttributeValue

    @ManyToOne(() => ProductVariation, productVariation => productVariation.attributes, DELETE_OPTIONS)
    productVariation: ProductVariation

}
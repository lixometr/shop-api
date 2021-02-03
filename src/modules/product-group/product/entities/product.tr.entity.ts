import { EntityTranslationBlueprint } from "src/blueprints/translation.entity";
import { ID } from "src/internal";
import {  Entity, ManyToOne,  } from "typeorm";
import { Product } from "./product.entity";

@Entity({})
export class ProductToLocale extends EntityTranslationBlueprint {

    @ManyToOne(() => Product, product => product.locale, { nullable: false, orphanedRowAction: 'delete', onDelete: 'CASCADE' })
    item: Product;

}

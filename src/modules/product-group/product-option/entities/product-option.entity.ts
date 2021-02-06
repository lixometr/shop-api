import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Currency, Product } from "src/internal";
import { EntityLocaleDefaultBlueprint } from "src/internal";
import { ProductOptionLocale } from "./product-options.tr.entity";
import { ProductOptionCostTypes, ProductOptionTypes } from "../product-option.types";
import { ID } from "src/internal";

@Entity({})
export class ProductOption extends EntityLocaleDefaultBlueprint {


    @ManyToOne(() => Product, product => product.options, { nullable: false, orphanedRowAction: 'delete', onDelete: 'CASCADE' })
    product: Product;

    @Column({ enum: ProductOptionTypes })
    type: ProductOptionTypes;

    @Column({ type: 'varchar', default: ProductOptionCostTypes.fixed })
    cost_type: ProductOptionCostTypes

    @Column({ nullable: true })
    comment: string;

    @Column({ type: 'json', nullable: true })
    settings: object;

    @Column()
    varName: string;

    @OneToMany(() => ProductOptionLocale, productOptionLocale => productOptionLocale.item, { cascade: true, eager: true })
    locale: ProductOptionLocale[];

    name: string;


}

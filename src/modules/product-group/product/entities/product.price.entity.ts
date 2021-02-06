import { EntityDefaultBlueprint } from "src/internal";
import { ID } from "src/internal";
import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn,  } from "typeorm";
import { Currency, Product } from "src/internal";

@Entity({})
export class ProductPrice  extends EntityDefaultBlueprint {

    @ManyToOne(() => Product, { nullable: false, orphanedRowAction: 'delete', onDelete: 'CASCADE' })
    item: Product;

    @Column()
    currencyId: ID;

    @ManyToOne(() => Currency, { nullable: false })
    currency: Currency;

    @Column({type: 'float'})
    price: number;

    @Column({type: 'float', nullable: true})
    oldPrice: number;

    @Column({nullable: true})
    sale: number;

}

import { DELETE_OPTIONS } from "src/constants";
import { ID } from "src/internal";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductVariationLocale } from "./product-variation.tr.entity";

@Entity()
export class ProductVariationDescription {
    @PrimaryGeneratedColumn()
    id: ID

    @ManyToOne(() => ProductVariationLocale, pLocale => pLocale.description, DELETE_OPTIONS)
    locale: ProductVariationLocale

    @Column({nullable: true})
    tab: string

    @Column({nullable: true})
    content: string
}
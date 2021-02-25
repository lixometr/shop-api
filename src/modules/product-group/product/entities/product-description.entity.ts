import { DELETE_OPTIONS } from "src/constants";
import { ID } from "src/internal";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductLocale } from "./product.tr.entity";

@Entity()
export class ProductDescription {
    @PrimaryGeneratedColumn()
    id: ID

    @ManyToOne(() => ProductLocale, pLocale => pLocale.description, DELETE_OPTIONS)
    productLocale: ProductLocale

    @Column({nullable: true})
    tab: string

    @Column({nullable: true})
    content: string
}
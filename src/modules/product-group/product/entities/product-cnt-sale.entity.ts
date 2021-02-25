import { DELETE_OPTIONS } from "src/constants";
import { ID, Product } from "src/internal";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductCntSale  {
    @PrimaryGeneratedColumn()
    id: ID

    @ManyToOne(() => Product, product => product.cntSale, DELETE_OPTIONS)
    item: Product

    @Column()
    sale: number

    @Column()
    cnt: number
}
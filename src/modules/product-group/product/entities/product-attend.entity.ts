import { DELETE_OPTIONS } from "src/constants";
import { ID, Product } from "src/internal";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductAttend {
    @PrimaryGeneratedColumn()
    id: ID

    // Cопутствующие товар
    @ManyToOne(() => Product, DELETE_OPTIONS)
    product: Product

    // Просто ссылка на продукт к которому принадлежит
    @ManyToOne(() => Product, product => product.attendProducts, DELETE_OPTIONS)
    hostProduct: Product
}
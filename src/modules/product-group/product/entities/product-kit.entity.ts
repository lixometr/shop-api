import { DELETE_OPTIONS } from "src/constants";
import { ID, Product } from "src/internal";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductKit {
    @PrimaryGeneratedColumn()
    id: ID

    @Column()
    productId: ID
    // Сам продукт в наборе
    @ManyToOne(() => Product, DELETE_OPTIONS)
    product: Product

    // Просто ссылка на продукт к которому принадлежит
    @ManyToOne(() => Product, product => product.kitProducts, DELETE_OPTIONS)
    hostProduct: Product
}
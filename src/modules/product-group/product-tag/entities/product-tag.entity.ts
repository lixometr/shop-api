import { EntityLocaleItemBlueprint, ProductTagLocale } from 'src/internal';
import { Product } from 'src/internal';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';

@Entity()
export class ProductTag extends EntityLocaleItemBlueprint {
   
    @Column()
    value: string;

    @OneToMany(() => ProductTagLocale, productTagLocale => productTagLocale.item, { cascade: true, eager: true })
    locale: ProductTagLocale[];

    @ManyToMany(() => Product, product => product.tags)
    products: Product[]
}

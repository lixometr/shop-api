import { EntityLocaleItemBlueprint, Product, ProductCategoryLocale } from "src/internal";
import { ID } from "src/internal";
import { Column, Entity, ManyToMany, OneToMany, Tree, TreeChildren, TreeParent } from "typeorm";

@Entity()
@Tree("materialized-path")
export class ProductCategory extends EntityLocaleItemBlueprint {

    @Column()
    name: string;

    @TreeChildren({cascade: true})
    children: ProductCategory[];

    @Column({nullable: true, })
    parentId: ID;

    @TreeParent()
    parent: ProductCategory;

    @ManyToMany(() => Product, product => product.category )
    products: Product[]

    @OneToMany(() => ProductCategoryLocale, catLocale => catLocale.item, { cascade: true, eager: true })
    locale: ProductCategoryLocale[];


}

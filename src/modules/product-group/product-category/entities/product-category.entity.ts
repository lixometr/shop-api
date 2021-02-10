import { Expose } from "class-transformer";
import { EntityLocaleItemBlueprint, EntitySeo, Product, ProductCategoryLocale, SerializeGroup } from "src/internal";
import { ID } from "src/internal";
import { Column, Entity, ManyToMany, OneToMany, Tree, TreeChildren, TreeParent } from "typeorm";

@Entity()
@Tree("materialized-path")
export class ProductCategory extends EntityLocaleItemBlueprint {


    @TreeChildren({ cascade: true })
    children: ProductCategory[];

    @Column({ nullable: true, })
    parentId: ID;

    @TreeParent()
    parent: ProductCategory;

    @ManyToMany(() => Product, product => product.category)
    products: Product[]

    @Expose({ groups: [SerializeGroup.Admin] })
    @OneToMany(() => ProductCategoryLocale, catLocale => catLocale.item, { cascade: true, eager: true })
    locale: ProductCategoryLocale[];
    name: string;

    

   

}

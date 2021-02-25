import { Expose } from "class-transformer";
import { CASCADE_NOT_INSERT } from "src/constants";
import { Attribute, EntityLocaleItemBlueprint, EntitySeo, Product, ProductCategoryLocale, SerializeGroup } from "src/internal";
import { ID } from "src/internal";
import { Image } from "src/modules/upload-group/image";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, Tree, TreeChildren, TreeParent } from "typeorm";
import { ProductCategorySoon } from "./product-category-soon.entity";

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
    title: string;
    seo: EntitySeo;
    textTop: string;
    textBottom: string;

    @Expose({groups: [SerializeGroup.AdminFull, SerializeGroup.Full]})
    @ManyToMany(() => Attribute, { cascade: CASCADE_NOT_INSERT, eager: true, })
    @JoinTable()
    availableFilterAttributes: Attribute[]

    @Expose({groups: [SerializeGroup.AdminFull, SerializeGroup.Full]})
    @Column({default: false})
    showFilterPrice: boolean

    @ManyToOne(() => Image, {cascade: CASCADE_NOT_INSERT, eager: true, onDelete: 'SET NULL', nullable: true})
    image: Image

  
    @Column(type => ProductCategorySoon)
    soon: ProductCategorySoon

    

}

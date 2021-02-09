import { LOCALE_REL_OPTIONS } from "src/constants";
import { EntitySeo, EntityTranslationBlueprint, ProductCategory } from "src/internal";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, Tree, TreeChildren, TreeParent } from "typeorm";

@Entity()
export class ProductCategoryLocale extends EntityTranslationBlueprint {

    @ManyToOne(() => ProductCategory, item => item.locale, LOCALE_REL_OPTIONS)
    item: ProductCategory;

    @Column()
    name: string

    @Column(type => EntitySeo)
    seo: EntitySeo
}

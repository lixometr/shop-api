import { Expose } from "class-transformer";
import { CASCADE_NOT_INSERT } from "src/constants";
import { EntityLocaleItemBlueprint, ProductToLocale, SLUG } from "src/internal";
import { ProductAttribute } from "src/internal";
import { ProductCategory } from "src/internal";
import { ProductTag } from "src/modules/product-tag/entities/product-tag.entity";
import { SerializeGroup } from "src/internal";
import { Column, Entity, getRepository, JoinTable, ManyToMany, OneToMany, } from "typeorm";
import { ProductStatus } from "../product.types";

@Entity({})
export class Product extends EntityLocaleItemBlueprint {

  @Column()
  slug: SLUG;

  @Column()
  price: number;


  @Column({ default: ProductStatus.Published, nullable: false, })
  status: ProductStatus

  @OneToMany(() => ProductToLocale, productToLocale => productToLocale.item, { cascade: true, eager: true })
  locale: ProductToLocale[];

  @ManyToMany(() => ProductTag, pTag => pTag.products, { cascade: CASCADE_NOT_INSERT, eager: true, nullable: true })
  @JoinTable()
  tags: ProductTag[]

  @OneToMany(() => ProductAttribute, productAttr => productAttr.product, { cascade: true, eager: true })
  attributes: ProductAttribute[]

  @Expose({groups: [SerializeGroup.Full]})
  @ManyToMany(() => ProductCategory, productCat => productCat.products, { cascade: CASCADE_NOT_INSERT, eager: true })
  @JoinTable()
  category: ProductCategory[]


}

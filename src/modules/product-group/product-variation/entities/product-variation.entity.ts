import { EntityLocaleDefaultBlueprint, EntitySeo, RequestPayload, SerializeGroup, } from "src/internal";
import { CASCADE_NOT_INSERT, DELETE_OPTIONS } from "src/constants";
import { ID } from "src/internal";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Product } from "src/internal";
import { ProductVariationAttributes } from "./product-variation-attributes.entity";
import { ProductVariationLocale } from "./product-variation.tr.entity";
import { ProductVariationPrice } from "./product-variation.price.entity";
import { transformCurrency } from "../../product.helpers";
import { Expose } from "class-transformer";
import { Image } from "src/internal";


@Entity()
export class ProductVariation extends EntityLocaleDefaultBlueprint {

  @Column()
  productId: ID

  @ManyToOne(() => Product, product => product.variations, DELETE_OPTIONS)
  product: Product

  @OneToMany(() => ProductVariationAttributes, productVariationAttributes => productVariationAttributes.productVariation, { eager: true, cascade: true })
  attributes: ProductVariationAttributes[]

  @Expose({groups: [SerializeGroup.Admin]})
  @OneToMany(() => ProductVariationLocale, (ProductVariationLocale) => ProductVariationLocale.item, { cascade: true, eager: true })
  locale: ProductVariationLocale[];

  name: string;

  @Expose({groups: [SerializeGroup.Admin, SerializeGroup.Full]})
  description: string;

  @Expose({groups: [SerializeGroup.Admin, SerializeGroup.Full]})
  seo: EntitySeo;

  @Expose({groups: [SerializeGroup.Admin]})
  @OneToMany(() => ProductVariationPrice, (productVariationPrice) => productVariationPrice.item, { cascade: true, eager: true })
  prices: ProductVariationPrice[];

  price: number;

  oldPrice: number;

  sale: number;

  @Column({ nullable: true })
  sku: string;


  @ManyToOne(() => Image, { cascade: CASCADE_NOT_INSERT, eager: true, nullable: true, onDelete: 'SET NULL' })
  defaultImage: Image;

  @Expose({ groups: [SerializeGroup.Full, SerializeGroup.AdminFull] })
  @ManyToMany(() => Image, { cascade: CASCADE_NOT_INSERT, eager: true, nullable: true })
  @JoinTable()
  images: Image[];


  transformCurrency(currencyId: ID) {
    return transformCurrency(this, currencyId, 'prices');
  }
  async serialize(payload: RequestPayload) {
    if (!payload.getGroups().includes(SerializeGroup.AdminFull)) {
      const currency = payload.getCurrency();
      this.transformCurrency(currency.id);
    }
    return super.serialize(payload);
  }
}
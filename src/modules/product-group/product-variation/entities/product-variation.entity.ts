import { EntityBaseMetadata, EntityLocaleDefaultBlueprint, EntitySeo, RequestPayload, SerializeGroup, } from "src/internal";
import { DELETE_OPTIONS } from "src/constants";
import { ID } from "src/internal";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Product } from "src/internal";
import { ProductVariationAttributes } from "./product-variation-attributes.entity";
import { ProductVariationLocale } from "./product-variation.tr.entity";
import { ProductVariationPrice } from "./product-variation.price.entity";
import { transformCurrency } from "../../product.helpers";
import { Expose } from "class-transformer";


@Entity()
export class ProductVariation extends EntityLocaleDefaultBlueprint {

    @Column()
    productId: ID

    @ManyToOne(() => Product, product => product.variations, DELETE_OPTIONS)
    product: Product

    @OneToMany(() => ProductVariationAttributes, productVariationAttributes => productVariationAttributes.productVariation, { eager: true, cascade: true })
    attributes: ProductVariationAttributes[]
   
    @OneToMany(() => ProductVariationLocale, (ProductVariationLocale) => ProductVariationLocale.item, { cascade: true, eager: true })
    locale: ProductVariationLocale[];

    name: string;

    description: string;

    seo: EntitySeo;

    @OneToMany(() => ProductVariationPrice, (productVariationPrice) => productVariationPrice.item, { cascade: true, eager: true })
    prices: ProductVariationPrice[];
  
    price: number;
  
    oldPrice: number;
  
    sale: number;

    @Column({nullable: true})
    sku: string;

    transformCurrency(currencyId: ID) {
        return transformCurrency(this, currencyId, 'prices');
      }
      async serialize(metadata: EntityBaseMetadata, payload: RequestPayload) {
        if (!metadata.groups.includes(SerializeGroup.AdminFull)) {
          const currency = payload.getCurrency();
          this.transformCurrency(currency.id);
        }
        return super.serialize(metadata, payload);
      }
}
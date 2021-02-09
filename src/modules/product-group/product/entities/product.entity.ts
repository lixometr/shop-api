import { Expose } from 'class-transformer';
import { CASCADE_NOT_INSERT } from 'src/constants';
import { EntityLocaleItemBlueprint, EntitySeo, ProductToLocale, SLUG } from 'src/internal';
import { ProductAttribute } from 'src/internal';
import { ProductCategory } from 'src/internal';
import { ProductTag } from 'src/internal';
import { SerializeGroup } from 'src/internal';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ProductStatus, ProductType } from '../product.types';
import { Image } from 'src/internal';
import { RequestPayload } from 'src/internal';
import { EntityBaseMetadata } from 'src/internal';
import { ProductPrice } from 'src/internal';
import { transformCurrency } from '../../product.helpers';
import * as _ from 'lodash';
import { ProductOption } from '../../product-option/entities/product-option.entity';
import { ID } from 'src/internal';
import { ProductReview } from 'src/internal';
import { ProductVariation } from '../../product-variation/entities/product-variation.entity';
@Entity({})
export class Product extends EntityLocaleItemBlueprint {

  @Column()
  slug: SLUG;

  @OneToMany(() => ProductPrice, (productPrice) => productPrice.item, { cascade: true, eager: true })
  prices: ProductPrice[];

  price: number;

  oldPrice: number;

  sale: number;

  @Expose({ groups: [SerializeGroup.Full] })
  @OneToMany(() => ProductOption, (productOption) => productOption.product, { eager: true, cascade: true })
  options: ProductOption[];

  @ManyToOne(() => Image, { cascade: CASCADE_NOT_INSERT, eager: true, nullable: true })
  defaultImage: Image;

  @Expose({ groups: [SerializeGroup.Full] })
  @ManyToMany(() => Image, { cascade: CASCADE_NOT_INSERT, eager: true, nullable: true })
  @JoinTable()
  images: Image[];

  @Column({ default: ProductStatus.Published, nullable: false })
  status: ProductStatus;

  @OneToMany(() => ProductToLocale, (productToLocale) => productToLocale.item, { cascade: true, eager: true })
  locale: ProductToLocale[];
  name: string;

  @ManyToMany(() => ProductTag, (pTag) => pTag.products, { cascade: CASCADE_NOT_INSERT, eager: true, nullable: true })
  @JoinTable()
  tags: ProductTag[];

  @OneToMany(() => ProductAttribute, (productAttr) => productAttr.product, { cascade: true, eager: true })
  attributes: ProductAttribute[];

  @Expose({ groups: [SerializeGroup.Full] })
  @ManyToMany(() => ProductCategory, (productCat) => productCat.products, { cascade: CASCADE_NOT_INSERT, eager: true })
  @JoinTable()
  category: ProductCategory[];

  @Column({ default: 0 })
  sortOrder: number;

  @Column()
  sku: string;

  @Column({ nullable: true })
  rating: number;

  @OneToMany(() => ProductReview, productReview => productReview.product)
  reviews: ProductReview

  @Column({ default: ProductType.simple })
  type: ProductType


  @OneToMany(() => ProductVariation, productVariation => productVariation.product, { cascade: true, eager: true })
  variations: ProductVariation[]

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

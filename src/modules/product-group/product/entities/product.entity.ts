import { Expose } from 'class-transformer';
import { CASCADE_NOT_INSERT, DELETE_OPTIONS } from 'src/constants';
import { EntityLocaleItemBlueprint, EntitySeo, ProductLocale, SLUG } from 'src/internal';
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
import { ProductPrice } from 'src/internal';
import { transformCurrency } from '../../product.helpers';
import * as _ from 'lodash';
import { ProductOption } from '../../product-option/entities/product-option.entity';
import { ID } from 'src/internal';
import { ProductReview } from 'src/internal';
import { ProductVariation } from '../../product-variation/entities/product-variation.entity';
import { ProductKit } from './product-kit.entity';
import { ProductCntSale } from './product-cnt-sale.entity';
import { ProductAttend } from './product-attend.entity';
@Entity({})
export class Product extends EntityLocaleItemBlueprint {

  @Column()
  slug: SLUG;

  @Expose({ groups: [SerializeGroup.Admin] })
  @OneToMany(() => ProductPrice, (productPrice) => productPrice.item, { cascade: true, eager: true })
  prices: ProductPrice[];

  price: number;

  oldPrice: number;

  sale: number;

  @Expose({ groups: [SerializeGroup.Full, SerializeGroup.AdminFull] })
  @OneToMany(() => ProductOption, (productOption) => productOption.product, { eager: true, cascade: true })
  options: ProductOption[];

  @ManyToOne(() => Image, { cascade: CASCADE_NOT_INSERT, eager: true, nullable: true, onDelete: 'SET NULL' })
  defaultImage: Image;

  @Expose({ groups: [SerializeGroup.Full, SerializeGroup.AdminFull] })
  @ManyToMany(() => Image, { cascade: CASCADE_NOT_INSERT, eager: true, nullable: true })
  @JoinTable()
  images: Image[];

  @Column({ default: ProductStatus.Published, nullable: false })
  status: ProductStatus;

  @Expose({ groups: [SerializeGroup.Admin] })
  @OneToMany(() => ProductLocale, (productLocale) => productLocale.item, { cascade: true, eager: true })
  locale: ProductLocale[];
  name: string;
  description: string;

  @ManyToMany(() => ProductTag, (pTag) => pTag.products, { cascade: CASCADE_NOT_INSERT, eager: true, nullable: true })
  @JoinTable()
  tags: ProductTag[];

  @Column({ default: false })
  showTags: boolean

  @OneToMany(() => ProductAttribute, (productAttr) => productAttr.product, { cascade: true, eager: true })
  attributes: ProductAttribute[];

  @Expose({ groups: [SerializeGroup.Full, SerializeGroup.AdminFull] })
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
  reviews: ProductReview[]

  @Column({ default: ProductType.simple })
  type: ProductType

  @Expose({ groups: [SerializeGroup.AdminFull, SerializeGroup.Full] })
  @OneToMany(() => ProductKit, product => product.hostProduct, { cascade: CASCADE_NOT_INSERT, eager: true, })
  kitProducts: ProductKit[]

  // Сопутствующие
  @Expose({ groups: [SerializeGroup.AdminFull, SerializeGroup.Full] })
  @OneToMany(() => ProductAttend, productAttend => productAttend.hostProduct, { cascade: CASCADE_NOT_INSERT, eager: true })
  attendProducts: ProductAttend

  @OneToMany(() => ProductVariation, productVariation => productVariation.product, { cascade: true, eager: true })
  variations: ProductVariation[]

  @Expose({ groups: [SerializeGroup.Full, SerializeGroup.AdminFull] })
  @OneToMany(() => ProductCntSale, cntSale => cntSale.item, { cascade: true, eager: true })
  cntSale: ProductCntSale[]

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

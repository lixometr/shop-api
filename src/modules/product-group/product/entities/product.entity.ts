import { Expose } from "class-transformer";
import { CASCADE_NOT_INSERT } from "src/constants";
import { EntityLocaleItemBlueprint, ProductToLocale, SLUG } from "src/internal";
import { ProductAttribute } from "src/internal";
import { ProductCategory } from "src/internal";
import { ProductTag } from "src/internal";
import { SerializeGroup } from "src/internal";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, } from "typeorm";
import { ProductStatus } from "../product.types";
import { Image } from "src/internal";
import { RequestPayload } from "src/internal";
import { EntityBaseMetadata } from "src/internal";
import { ProductPrice } from "src/internal";

import { ID } from "src/internal";
import * as _ from "lodash";
import { ProductOption } from "../../product-option/entities/product-option.entity";
const PRICE_PROP = 'prices'
@Entity({})
export class Product extends EntityLocaleItemBlueprint {

  name: string;

  @Column()
  slug: SLUG;

  @OneToMany(() => ProductPrice, productPrice => productPrice.item, { cascade: true, eager: true })
  prices: ProductPrice[];

  price: number;

  oldPrice: number;

  sale: number;

  @Expose({ groups: [SerializeGroup.Full] })
  @OneToMany(() => ProductOption, productOption => productOption.product, { eager: true, cascade: true })
  options: ProductOption[]

  @ManyToOne(() => Image, { cascade: CASCADE_NOT_INSERT, eager: true, nullable: true })
  defaultImage: Image

  @Expose({ groups: [SerializeGroup.Full] })
  @ManyToMany(() => Image, { cascade: CASCADE_NOT_INSERT, eager: true, nullable: true })
  @JoinTable()
  images: Image[]

  @Column({ default: ProductStatus.Published, nullable: false, })
  status: ProductStatus

  @OneToMany(() => ProductToLocale, productToLocale => productToLocale.item, { cascade: true, eager: true })
  locale: ProductToLocale[];

  @ManyToMany(() => ProductTag, pTag => pTag.products, { cascade: CASCADE_NOT_INSERT, eager: true, nullable: true })
  @JoinTable()
  tags: ProductTag[]

  @OneToMany(() => ProductAttribute, productAttr => productAttr.product, { cascade: true, eager: true })
  attributes: ProductAttribute[]

  @Expose({ groups: [SerializeGroup.Full] })
  @ManyToMany(() => ProductCategory, productCat => productCat.products, { cascade: CASCADE_NOT_INSERT, eager: true })
  @JoinTable()
  category: ProductCategory[]

  transformCurrency(currencyId: ID) {
    if (typeof currencyId !== 'number' || !currencyId) {
      return
    }
    const _init = (arr: Array<ProductPrice>): ProductPrice => {
      let currencyItemIdx = arr.findIndex(item => item.currencyId === currencyId)

      if (currencyItemIdx < 0) {
        return null
      }
      return arr[currencyItemIdx]
    }

    const _merge = (target: object, field: object): void => {
      target = _.merge(target, field)
      delete target[PRICE_PROP]
    }

    const recursiveInit = function t(target) {
      const props = Object.keys(target)
      props.map(prop => {
        if (prop === PRICE_PROP) {
          const value = _init(target[prop] || [])
          delete value.currencyId
          delete value.id
          _merge(target, value)
          return
        }

      })
    }
    recursiveInit(this)
  }
  async serialize(metadata: EntityBaseMetadata, payload: RequestPayload) {
    const currency = payload.getCurrency()
    this.transformCurrency(currency.id)
    return super.serialize(metadata, payload)
  }

}

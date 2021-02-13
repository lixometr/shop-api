import { Expose } from "class-transformer";
import { EntityBaseMetadata, EntityLocaleDefaultBlueprint, ID, OrderDeliveryLocale, OrderDeliveryPrice, RequestPayload, SerializeGroup } from "src/internal";
import { transformCurrency } from "src/modules/product-group/product.helpers";
import { Entity, OneToMany } from "typeorm";

@Entity()
export class OrderDelivery extends EntityLocaleDefaultBlueprint {
  // Делаем slug
  slug: string

  @Expose({ groups: [SerializeGroup.Admin] })
  @OneToMany(() => OrderDeliveryLocale, (locale) => locale.item, { cascade: true, eager: true })
  locale: OrderDeliveryLocale[];
  name: string;

  @Expose({ groups: [SerializeGroup.Admin] })
  @OneToMany(() => OrderDeliveryPrice, price => price.item, { cascade: true, eager: true })
  prices: OrderDeliveryPrice
  price: number

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

import { Expose } from "class-transformer";
import { EntityLocaleDefaultBlueprint, ID, DeliveryLocale, DeliveryPrice, RequestPayload, SerializeGroup } from "src/internal";
import { transformCurrency } from "src/modules/product-group/product.helpers";
import { Column, Entity, OneToMany } from "typeorm";
import { DeliveryTypes } from "../delivery.types";

@Entity()
export class Delivery extends EntityLocaleDefaultBlueprint {

  @Expose({ groups: [SerializeGroup.Admin] })
  @OneToMany(() => DeliveryLocale, (locale) => locale.item, { cascade: true, eager: true })
  locale: DeliveryLocale[];
  deliveryTime?: string
  address?: string

  @Expose({ groups: [SerializeGroup.Admin] })
  @OneToMany(() => DeliveryPrice, price => price.item, { cascade: true, eager: true })
  prices: DeliveryPrice
  price?: number

  @Column("enum", { enum: DeliveryTypes })
  type: DeliveryTypes

  // fot integrations
  @Expose({groups: [SerializeGroup.Admin]})
  @Column({nullable: true})
  apiKey: string

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

import { Expose } from "class-transformer";
import { EntityLocaleDefaultBlueprint } from "src/blueprints";
import { EntityBaseMetadata, ID, RequestPayload, SerializeGroup } from "src/internal";
import { transformCurrency } from "src/modules/product-group/product.helpers";
import { Column, Entity, OneToMany } from "typeorm";
import { PromocodeTypes } from "../promocode.types";
import { PromocodePrice } from "./promocode.price.entity";
import { PromocodeLocale } from "./promocode.tr.entity";

@Entity()
export class Promocode extends EntityLocaleDefaultBlueprint {

    @Column({ default: PromocodeTypes.fixed })
    saleType: PromocodeTypes

    @Expose({ groups: [SerializeGroup.Admin] })
    @OneToMany(() => PromocodeLocale, (pormocodeLocale) => pormocodeLocale.item, { cascade: true, eager: true })
    locale: PromocodeLocale[];

    @Expose({ groups: [SerializeGroup.Admin] })
    @OneToMany(() => PromocodePrice, (promocodePrice) => promocodePrice.item, { cascade: true, eager: true })
    value: PromocodePrice[];

    // сколько можно использовать
    // -1- infinite
    @Column({ default: -1 })
    useCount: number

    // сколько можно использовать на юзера
    // -1 - infinite
    @Column({ default: -1 })
    useUserCount: number

    @Column({ type: 'date', nullable: true })
    end_date: string

    @Column({ default: 0 })
    usedTimes: number

    transformCurrency(currencyId: ID) {
        return transformCurrency(this, currencyId, 'value');
    }
    async serialize(metadata: EntityBaseMetadata, payload: RequestPayload) {
        if (!metadata.groups.includes(SerializeGroup.AdminFull)) {
            const currency = payload.getCurrency();
            this.transformCurrency(currency.id);
        }
        return super.serialize(metadata, payload);
    }
}

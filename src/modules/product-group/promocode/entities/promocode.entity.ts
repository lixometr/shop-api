import { Exclude, Expose } from "class-transformer";
import { EntityLocaleDefaultBlueprint } from "src/blueprints";
import { EntityBaseMetadata, ID, RequestPayload, SerializeGroup } from "src/internal";
import { transformCurrency } from "src/modules/product-group/product.helpers";
import { Column, Entity, OneToMany } from "typeorm";
import { PromocodeTypes } from "../promocode.types";
import { PromocodePrice } from "./promocode.price.entity";
import { PromocodeLocale } from "./promocode.tr.entity";
import { PromocodeUsedPerUser } from "./promocode.used.entity";

@Entity()
export class Promocode extends EntityLocaleDefaultBlueprint {

    @Column({ default: PromocodeTypes.fixed })
    saleType: PromocodeTypes

    @Expose({ groups: [SerializeGroup.Admin] })
    @OneToMany(() => PromocodeLocale, (pormocodeLocale) => pormocodeLocale.item, { cascade: true, eager: true })
    locale: PromocodeLocale[];
    name: string
    
    @Expose({ groups: [SerializeGroup.Admin] })
    @OneToMany(() => PromocodePrice, (promocodePrice) => promocodePrice.item, { cascade: true, eager: true })
    value: PromocodePrice[];
    sale: number
    // сколько можно использовать
    // -1- infinite
    @Expose({groups: [SerializeGroup.Admin]})
    @Column({ default: -1 })
    useCount: number

    // сколько можно использовать на юзера
    // -1 - infinite
    @Expose({groups: [SerializeGroup.Admin]})
    @Column({ default: -1 })
    useUserCount: number

    @Expose({groups: [SerializeGroup.Admin]})
    @Column({ type: 'date', nullable: true })
    end_date: string

    @Expose({groups: [SerializeGroup.Admin]})
    @Column({ default: 0 })
    usedTimes: number

    @Exclude()
    @OneToMany(() => PromocodeUsedPerUser, promoUsed => promoUsed.promocode, {cascade: true, eager: true})
    usedPerUser: PromocodeUsedPerUser[]   

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

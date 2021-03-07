import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {
    Product,
    RequestPayload,
} from 'src/internal';
import { EntityLocaleDefaultBlueprint } from 'src/internal';
import { ProductOptionValueLocale } from './product-option-value.tr.entity';

import { ID } from 'src/internal';
import { ProductOptionValuePrice } from './product-option-value.price.entity';
import { transformCurrency } from '../../product.helpers';
import { SerializeGroup } from 'src/types';
import { ProductOption } from './product-option.entity';
import { Expose } from 'class-transformer';

@Entity({})
export class ProductOptionValue extends EntityLocaleDefaultBlueprint {
    @ManyToOne(() => ProductOption, (productOption) => productOption.values, {
        nullable: false,
        orphanedRowAction: 'delete',
        onDelete: 'CASCADE',
    })
    option: ProductOption;

    // @Column()
    // varName: string;

    @Column({ type: 'json', nullable: true })
    settings: any;

    @Expose({ groups: [SerializeGroup.Admin] })
    @OneToMany(() => ProductOptionValuePrice, (optPrice) => optPrice.item, { cascade: true, eager: true, })
    prices: ProductOptionValuePrice[];
    
    price: number;

    @Expose({ groups: [SerializeGroup.Admin] })
    @OneToMany(() => ProductOptionValueLocale, (optValLocale) => optValLocale.item, { cascade: true, eager: true },)
    locale: ProductOptionValueLocale[];

    name: string;

    transformCurrency(currencyId: ID) {
        return transformCurrency(this, currencyId, 'prices');
    }
    async serialize(payload: RequestPayload) {
        if (!payload.getGroups().includes(SerializeGroup.AdminFull)) {
            const currency = payload.getCurrency();
            this.transformCurrency(currency.id);
        }

        return super.serialize( payload);
    }
}

import {
    Column,
    Entity,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import {
    EntityBaseMetadata,
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

    @OneToMany(() => ProductOptionValuePrice, (optPrice) => optPrice.item, { cascade: true, eager: true, })
    prices: ProductOptionValuePrice[];
    
    price: number;

    @OneToMany(() => ProductOptionValueLocale, (optValLocale) => optValLocale.item, { cascade: true, eager: true },)
    locale: ProductOptionValueLocale[];

    name: string;

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

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
import { ProductOptionLocale } from './product-option.tr.entity';
import {
  ProductOptionCostTypes,
  ProductOptionTypes,
} from '../product-option.types';
import { ID } from 'src/internal';
import { transformCurrency } from '../../product.helpers';
import { SerializeGroup } from 'src/types';
import { ProductOptionValue } from './product-option-value.entity';

@Entity({})
export class ProductOption extends EntityLocaleDefaultBlueprint {
  @ManyToOne(() => Product, (product) => product.options, {
    nullable: false,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column({ enum: ProductOptionTypes })
  type: ProductOptionTypes;

  @Column({ type: 'varchar', default: ProductOptionCostTypes.fixed })
  cost_type: ProductOptionCostTypes;

  @Column({ nullable: true })
  comment: string;

  @Column({ type: 'json', nullable: true })
  settings: any;

  // @Column()
  // varName: string;

  @OneToMany(() => ProductOptionValue, optVal => optVal.option, { cascade: true, eager: true })
  values: ProductOptionValue[]

  @OneToMany(
    () => ProductOptionLocale,
    (productOptionLocale) => productOptionLocale.item,
    { cascade: true, eager: true },
  )
  locale: ProductOptionLocale[];

  name: string;

  
}

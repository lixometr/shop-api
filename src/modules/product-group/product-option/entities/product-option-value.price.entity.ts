import { EntityDefaultBlueprint } from 'src/internal';
import { ID } from 'src/internal';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Currency } from 'src/internal';
import { ProductOptionValue } from './product-option-value.entity';

@Entity({})
export class ProductOptionValuePrice {
  @PrimaryGeneratedColumn()
  id: ID
  
  @ManyToOne(() => ProductOptionValue, {
    nullable: false,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  item: ProductOptionValue;

  @Column()
  currencyId: ID;

  @ManyToOne(() => Currency, { nullable: false })
  currency: Currency;

  // До 1 млн
  @Column('float', { precision: 40, scale: 2 })
  price: number;
}

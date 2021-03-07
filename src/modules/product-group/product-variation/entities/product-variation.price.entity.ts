
import { ID } from 'src/internal';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Currency, ProductVariation } from 'src/internal';
import { DELETE_OPTIONS } from 'src/constants';

@Entity({})
export class ProductVariationPrice  {
  @PrimaryGeneratedColumn()
  id: ID
  
  @ManyToOne(() => ProductVariation, DELETE_OPTIONS)
  item: ProductVariation;

  @Column()
  currencyId: ID;

  @ManyToOne(() => Currency, { nullable: false })
  currency: Currency;

  // До 1 млн
  @Column({ type: 'float', precision: 40, scale: 2 })
  price: number;

  // До 1 млн
  @Column('float', { precision: 40, scale: 2, nullable: true })
  oldPrice: number;

  @Column({ nullable: true })
  sale: number;
}

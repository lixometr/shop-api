import { EntityDefaultBlueprint } from 'src/internal';
import { ID } from 'src/internal';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Currency, ProductVariation } from 'src/internal';

@Entity({})
export class ProductVariationPrice extends EntityDefaultBlueprint {
  @ManyToOne(() => ProductVariation, { nullable: false, orphanedRowAction: 'delete', onDelete: 'CASCADE' })
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

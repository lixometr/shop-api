import { EntityDefaultBlueprint } from 'src/internal';
import { ID } from 'src/internal';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Currency, Product } from 'src/internal';

@Entity({})
export class ProductPrice extends EntityDefaultBlueprint {
  @ManyToOne(() => Product, {
    nullable: false,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  item: Product;

  @Column()
  currencyId: ID;

  @ManyToOne(() => Currency, { nullable: false })
  currency: Currency;

  // До 1 млн
  @Column( {type: 'float', precision: 40, scale: 2 })
  price: number;
  
  // До 1 млн
  @Column('float', { precision: 40, scale: 2, nullable: true})
  oldPrice: number;

  @Column({ nullable: true })
  sale: number;
}

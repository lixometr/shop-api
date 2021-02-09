import { EntityDefaultBlueprint } from 'src/internal';
import { ID } from 'src/internal';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Currency, Promocode } from 'src/internal';

@Entity({})
export class PromocodePrice extends EntityDefaultBlueprint {
  @ManyToOne(() => Promocode, { nullable: false, orphanedRowAction: 'delete', onDelete: 'CASCADE' })
  item: Promocode;

  @Column()
  currencyId: ID;

  @ManyToOne(() => Currency, { nullable: false })
  currency: Currency;

  // До 1 млн
  @Column({ type: 'float', precision: 40, scale: 2 })
  price: number;

}

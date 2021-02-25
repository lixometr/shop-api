import { Currency, ID, Delivery } from "src/internal";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({})
export class DeliveryPrice {
  @PrimaryGeneratedColumn()
  id: ID

  @ManyToOne(() => Delivery, item => item.prices, {
    nullable: false,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  item: Delivery;

  @Column()
  currencyId: ID;

  @ManyToOne(() => Currency, { nullable: false })
  currency: Currency;

  @Column('float', { precision: 40, scale: 2 })
  price: number;
}

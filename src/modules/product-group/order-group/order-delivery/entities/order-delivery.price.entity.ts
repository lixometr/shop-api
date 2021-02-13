import { Currency, ID, OrderDelivery } from "src/internal";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({})
export class OrderDeliveryPrice {
  @PrimaryGeneratedColumn()
  id: ID
  
  @ManyToOne(() => OrderDelivery, item => item.prices, {
    nullable: false,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  item: OrderDelivery;

  @Column()
  currencyId: ID;

  @ManyToOne(() => Currency, { nullable: false })
  currency: Currency;

  @Column('float', { precision: 40, scale: 2 })
  price: number;
}

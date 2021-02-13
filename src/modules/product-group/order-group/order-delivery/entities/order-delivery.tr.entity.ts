import {  EntityTranslationBlueprint, OrderDelivery } from 'src/internal';
import { Column, Entity, ManyToOne } from 'typeorm';


@Entity({})
export class OrderDeliveryLocale extends EntityTranslationBlueprint {
  @ManyToOne(() => OrderDelivery, {
    nullable: false,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })

  item: OrderDelivery;

  @Column()
  name: string;

  

}

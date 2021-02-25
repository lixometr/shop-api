import {  EntityTranslationBlueprint, Delivery } from 'src/internal';
import { Column, Entity, ManyToOne } from 'typeorm';


@Entity({})
export class DeliveryLocale extends EntityTranslationBlueprint {
  @ManyToOne(() => Delivery, {
    nullable: false,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })

  item: Delivery;


  @Column({nullable: true})
  deliveryTime: string

  @Column({nullable: true})
  address: string

}

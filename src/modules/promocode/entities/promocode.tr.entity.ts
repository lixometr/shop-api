import { EntitySeo, EntityTranslationBlueprint } from 'src/internal';
import { ID } from 'src/internal';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Promocode } from 'src/internal';

@Entity({})
export class PromocodeLocale extends EntityTranslationBlueprint {
  @ManyToOne(() => Promocode, (Promocode) => Promocode.locale, {
    nullable: false,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  item: Promocode;

  @Column()
  name: string;

 

}

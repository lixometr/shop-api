import { EntityTranslationBlueprint } from 'src/internal';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ProductOption } from 'src/internal';

@Entity({})
export class ProductOptionLocale extends EntityTranslationBlueprint {
  @ManyToOne(() => ProductOption, (productOption) => productOption.locale, {
    nullable: false,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  item: ProductOption;

  @Column()
  name: string;
}

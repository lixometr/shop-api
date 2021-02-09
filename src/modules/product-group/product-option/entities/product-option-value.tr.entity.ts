import { EntityTranslationBlueprint } from 'src/internal';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ProductOptionValue } from './product-option-value.entity';

@Entity({})
export class ProductOptionValueLocale extends EntityTranslationBlueprint {
  @ManyToOne(() => ProductOptionValue, (productOptionValue) => productOptionValue.locale, {
    nullable: false,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  item: ProductOptionValue;

  @Column()
  name: string;
}

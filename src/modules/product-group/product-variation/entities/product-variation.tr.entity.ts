import { EntitySeo, EntityTranslationBlueprint } from 'src/internal';
import { ID } from 'src/internal';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ProductVariation } from 'src/internal';

@Entity({})
export class ProductVariationLocale extends EntityTranslationBlueprint {
  @ManyToOne(() => ProductVariation, (productVariation) => productVariation.locale, {
    nullable: false,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  item: ProductVariation;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column(type => EntitySeo)
  seo: EntitySeo

}

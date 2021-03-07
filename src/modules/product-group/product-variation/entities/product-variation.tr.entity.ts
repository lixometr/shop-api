import { EntitySeo, EntityTranslationBlueprint } from 'src/internal';
import { ID } from 'src/internal';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ProductVariation } from 'src/internal';
import { LOCALE_REL_OPTIONS } from 'src/constants';

@Entity({})
export class ProductVariationLocale extends EntityTranslationBlueprint {
  @ManyToOne(() => ProductVariation, (productVariation) => productVariation.locale, LOCALE_REL_OPTIONS)
  item: ProductVariation;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column(type => EntitySeo)
  seo: EntitySeo

}

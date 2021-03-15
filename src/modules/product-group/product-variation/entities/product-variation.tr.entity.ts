import { EntitySeo, EntityTranslationBlueprint } from 'src/internal';
import { ID } from 'src/internal';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ProductVariation } from 'src/internal';
import { LOCALE_REL_OPTIONS } from 'src/constants';
import { ProductVariationDescription } from './product-variation-description.entity';
import { Expose } from 'class-transformer';
import { SerializeGroup } from 'src/internal';

@Entity({})
export class ProductVariationLocale extends EntityTranslationBlueprint {
  @ManyToOne(() => ProductVariation, (productVariation) => productVariation.locale, LOCALE_REL_OPTIONS)
  item: ProductVariation;

  @Column()
  name: string;

  @OneToMany(() => ProductVariationDescription, pDescription => pDescription.locale, { cascade: true, eager: true })
  description: ProductVariationDescription[];

  @Column(type => EntitySeo)
  seo: EntitySeo

}

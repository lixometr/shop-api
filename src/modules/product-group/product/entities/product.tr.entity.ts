import { EntitySeo, EntityTranslationBlueprint } from 'src/internal';
import { ID } from 'src/internal';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Product } from 'src/internal';

@Entity({})
export class ProductToLocale extends EntityTranslationBlueprint {
  @ManyToOne(() => Product, (product) => product.locale, {
    nullable: false,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  item: Product;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column(type => EntitySeo)
  seo: EntitySeo

}

import { EntitySeo, EntityTranslationBlueprint } from 'src/internal';
import { ID } from 'src/internal';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Product } from 'src/internal';
import { ProductDescription } from './product-description.entity';

@Entity({})
export class ProductLocale extends EntityTranslationBlueprint {
  @ManyToOne(() => Product, (product) => product.locale, {
    nullable: false,
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
  })
  item: Product;

  @Column()
  name: string;

  @OneToMany(() => ProductDescription, pDescription => pDescription.productLocale, { cascade: true, eager: true })
  description: ProductDescription[];

  @Column(type => EntitySeo)
  seo: EntitySeo

}

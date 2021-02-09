import { EntityLocaleItemBlueprint } from 'src/blueprints';
import { Column, Entity, OneToMany } from 'typeorm';
import { CurrencyLocale } from './currency.tr.entity';

@Entity()
export class Currency extends EntityLocaleItemBlueprint {
  @Column()
  sign: string;

  @Column()
  iso: string;

  @OneToMany(() => CurrencyLocale, (catLocale) => catLocale.item, {
    cascade: true,
    eager: true,
  })
  locale: CurrencyLocale[];
}

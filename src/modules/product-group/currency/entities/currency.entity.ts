import { Expose } from 'class-transformer';
import { EntityLocaleItemBlueprint } from 'src/blueprints';
import { SerializeGroup } from 'src/types';
import { Column, Entity, OneToMany } from 'typeorm';
import { CurrencyLocale } from './currency.tr.entity';

@Entity()
export class Currency extends EntityLocaleItemBlueprint {
  @Column()
  sign: string;

  @Column()
  iso: string;

  @Expose({ groups: [SerializeGroup.Admin] })
  @OneToMany(() => CurrencyLocale, (catLocale) => catLocale.item, {
    cascade: true,
    eager: true,
  })
  locale: CurrencyLocale[];
}

import { EntityItemBlueprint } from 'src/internal';
import { Entity, Column } from 'typeorm';

@Entity()
export class Locale extends EntityItemBlueprint {
  @Column()
  name: string;

  @Column({nullable: true})
  iso: string
}

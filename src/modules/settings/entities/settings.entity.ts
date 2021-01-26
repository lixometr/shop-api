import { EntityItemBlueprint } from 'src/internal';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Settings extends EntityItemBlueprint {
    @Column({type: 'json', nullable: true})
    value: any;
}

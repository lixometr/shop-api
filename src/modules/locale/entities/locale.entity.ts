import { EntityItemBlueprint } from 'src/internal';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Locale extends EntityItemBlueprint{
    
    @Column()
    name: string;
}

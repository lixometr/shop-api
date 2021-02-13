import { DELETE_OPTIONS } from "src/constants";
import { ID, Promocode, User } from "src/internal";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PromocodeUsedPerUser {
    @PrimaryGeneratedColumn()
    id: ID

    @Column()
    userId: ID

    @ManyToOne(() => User, DELETE_OPTIONS)
    user: User

    @Column()
    promocodeId: ID

    @ManyToOne(() => Promocode, DELETE_OPTIONS)
    promocode: Promocode

    @Column({ default: 0 })
    times: number
}
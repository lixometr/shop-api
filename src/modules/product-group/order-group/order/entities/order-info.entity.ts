import { EntityDefaultBlueprint } from "src/blueprints";
import { DELETE_OPTIONS } from "src/constants";
import { ID } from "src/types";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderInfo {

    @PrimaryGeneratedColumn()
    id: ID
    
    @Column()
    name: string

    @Column({nullable: true})
    surName: string

    @Column()
    email: string
    
    @OneToOne(() => Order, order => order.info, DELETE_OPTIONS)
    order: Order

}
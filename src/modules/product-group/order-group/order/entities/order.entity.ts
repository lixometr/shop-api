import { EntityDefaultBlueprint } from "src/blueprints";
import { Currency, Locale, Promocode } from "src/internal";
import { User } from "src/internal";
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { OrderStatus } from "../order.types";
import { OrderInfo } from "./order-info.entity";
import { OrderProduct } from "./order-product.entity";
import { OrderUser } from "./order-user.entity";

@Entity()
export class Order extends EntityDefaultBlueprint {

    @Column({ unique: true })
    orderId: string

    @Column({ nullable: false, default: OrderStatus.waiting })
    status: OrderStatus

    @Column('json', { nullable: true })
    promocode: Promocode

    @Column('json')
    user: OrderUser

    @OneToMany(() => OrderProduct, orderProduct => orderProduct.order, { cascade: true, eager: true })
    products: OrderProduct[]

    @Column('json', )
    paymentType: any

    @Column('json', )
    deliveryType: any

    @OneToOne(() => OrderInfo, orderInfo => orderInfo.order, { cascade: true, eager: true })
    info: OrderInfo;

    @Column()
    totalPrice: number

    @Column('json')
    currency: Currency

    @Column('json')
    locale: Locale

    @Column({ nullable: true })
    comment: string
}

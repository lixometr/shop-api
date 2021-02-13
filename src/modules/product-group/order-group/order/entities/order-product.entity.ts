import { EntityDefaultBlueprint, Product, ProductOption, ProductType, ProductVariation } from "src/internal";
import { Column, Entity, ManyToOne } from "typeorm";
import { ID, Image, SLUG } from "src/internal";
import { Order } from "./order.entity";
export type OrderProductItemType = Pick<Product, "name" | "slug" | "price" | "oldPrice" | "sale" | "options" | "defaultImage" | "type" | "variations" | "rating" | "sku">;

export class OrderProductItem implements OrderProductItemType {
    name: string
    slug: SLUG
    price: number
    oldPrice: number
    sale: number
    options: ProductOption[]
    defaultImage: Image
    type: ProductType
    variations: ProductVariation[]
    rating: number
    sku: string
}

@Entity()
export class OrderProduct extends EntityDefaultBlueprint {

    @Column({ default: 1 })
    cnt: number

    @Column({ nullable: true })
    activeVariation: ID

    @Column('json', { nullable: true })
    activeOptions: any

    @Column({ type: 'json' })
    product: OrderProductItem

    @ManyToOne(() => Order, order => order.products)
    order: Order
}
import { EntityDefaultBlueprint, Product, ProductOption, ProductType, ProductVariation } from "src/internal";
import { Column, Entity, ManyToOne } from "typeorm";
import { ID, Image, SLUG, ProductCntSale } from "src/internal";
import { Order } from "./order.entity";
import { DELETE_OPTIONS } from "src/constants";
export type OrderProductItemType = Pick<Product, "name" | "slug" | "price" | "oldPrice" | "sale" | "options" | "defaultImage" | "type" | "variations" | "rating" | "sku">;

export class OrderProductItem implements OrderProductItemType {
    id: ID
    status: any
    category: any
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
    cntSale: ProductCntSale[]
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

    @ManyToOne(() => Order, order => order.products, DELETE_OPTIONS)
    order: Order
}

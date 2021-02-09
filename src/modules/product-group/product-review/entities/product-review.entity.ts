import { EntityDefaultBlueprint } from "src/blueprints";
import { DELETE_OPTIONS } from "src/constants";
import { User } from "src/internal";
import { Column, Entity, ManyToOne } from "typeorm";
import { Product } from "src/internal";
import { ProductReviewStatus } from "../product-review.types";
import { ID } from "src/types";

@Entity()
export class ProductReview extends EntityDefaultBlueprint {
    @Column()
    userId: ID

    @ManyToOne(() => User, user => user.reviews, DELETE_OPTIONS)
    user: User

    @Column()
    productId: ID

    @ManyToOne(() => Product, product => product.reviews, DELETE_OPTIONS)
    product: Product


    @Column()
    title: string

    @Column()
    content: string

    @Column()
    rating: number

    @Column({ default: ProductReviewStatus.pending })
    status: ProductReviewStatus
}

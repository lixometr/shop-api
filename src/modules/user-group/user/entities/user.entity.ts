import { Exclude } from "class-transformer";
import { EntityDefaultBlueprint } from "src/internal";
import { ProductReview } from "src/internal";
import { Column, Entity, OneToMany } from "typeorm";
import { Roles } from "../user.types";

@Entity()
export class User extends EntityDefaultBlueprint{
    @Column()
    firstName: string;

    @Column({nullable: true})
    lastName: string;

    @Column({unique: true})
    email: string;

    @Exclude()
    @Column()
    password?: string;

    @Exclude()
    @Column({nullable: true})
    confirmKey?: string;

    @Exclude({})
    @Column({nullable: true})
    restoreKey?: string;
    
    @Exclude()
    @Column({default: false})
    isConfirmed?: boolean;

    @Exclude()
    @Column({type: 'varchar', default: Roles.USER})
    role?: Roles;

    @OneToMany(() => ProductReview, productReview => productReview.user)
    reviews: ProductReview
}

/*

  phone: String,

  
  keep_update: {
    type: Boolean,
    default: false
  },
  used_promocodes: {
    type: [
      {
        promocode: {
          type: Schema.Types.ObjectId,
          ref: "Promocode"
        },
        times: {
          type: Number,
          default: 0
        }
      }
    ],
    default: () => []
  },
  coins: {
    type: Number,
    default: 0
  },

  total_coins: {
    type: Number,
    default: 0
  },
  awards: [
    UserAward
  ],
  available_awards: [
    {}
  ],
  // 0 - no, 2 - waiting 1 - available
  award_status: {
    type: Number,
    default: 0
  },

  role: {
    type: String,
    default: 'user'
  },

*/

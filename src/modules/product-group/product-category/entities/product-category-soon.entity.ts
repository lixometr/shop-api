import { Column } from "typeorm";

export class ProductCategorySoon {
    @Column({default: false})
    show: boolean

    @Column({nullable: true})
    color1: string

    @Column({nullable: true})
    color2: string
}
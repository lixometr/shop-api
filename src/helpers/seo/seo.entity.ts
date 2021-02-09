import { Column } from "typeorm";

export class EntitySeo {
    @Column({nullable: true})
    title: string;

    @Column({nullable: true})
    description: string;

    @Column({nullable: true})
    keywords: string
}
import { Expose } from 'class-transformer';
import { EntityLocaleItemBlueprint, ProductTagLocale, SerializeGroup } from 'src/internal';
import { Product } from 'src/internal';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';

@Entity()
export class ProductTag extends EntityLocaleItemBlueprint {
   
    @Column()
    value: string;

    @Expose({ groups: [SerializeGroup.Admin] })
    @OneToMany(() => ProductTagLocale, productTagLocale => productTagLocale.item, { cascade: true, eager: true })
    locale: ProductTagLocale[];

    @ManyToMany(() => Product, product => product.tags)
    products: Product[]

    @Column({nullable: true})
    color: string
    
    @Column({nullable: true})
    color2: string
}

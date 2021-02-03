import { LOCALE_REL_OPTIONS } from "src/constants";
import { EntityTranslationBlueprint } from "src/internal";
import { ProductTag } from "src/internal";
import { ID } from "src/internal";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({})
export class ProductTagLocale extends EntityTranslationBlueprint{

    @ManyToOne(() => ProductTag, productTag => productTag.locale, LOCALE_REL_OPTIONS)
    item: ProductTag;

}

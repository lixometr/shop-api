
import { Column } from "typeorm";
import { EntityDefaultBlueprint } from ".";

export  class EntityItemBlueprint extends EntityDefaultBlueprint {
   
    @Column({ unique: false, length: 500, })
    slug: string;

}

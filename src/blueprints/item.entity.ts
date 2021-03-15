
import { Column, Index } from "typeorm";
import { EntityDefaultBlueprint } from ".";

export  class EntityItemBlueprint extends EntityDefaultBlueprint {
   
    @Index()
    @Column({  length: 500, })
    slug: string;

}

import { Exclude } from "class-transformer";
import { CreateDateColumn,  PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as _ from "lodash"
import { EntityBase } from ".";
import { ID } from "src/internal";

export class EntityDefaultBlueprint extends EntityBase {

    @PrimaryGeneratedColumn()
    id: ID;

    @Exclude()
    @CreateDateColumn()
    createdAt?: string;

    @Exclude()
    @UpdateDateColumn()
    updatedAt?: string;




}

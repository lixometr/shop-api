import { Exclude, Expose } from "class-transformer";
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as _ from "lodash"
import { EntityBase } from ".";
import { ID } from "src/internal";
import { SerializeGroup } from "src/types";

export class EntityDefaultBlueprint extends EntityBase {

    @PrimaryGeneratedColumn()
    id: ID;

    @Expose({ groups: [SerializeGroup.Admin] })
    @CreateDateColumn()
    createdAt?: string;

    @Expose({ groups: [SerializeGroup.Admin] })
    @UpdateDateColumn()
    updatedAt?: string;

    @Expose({ groups: [SerializeGroup.Admin] })
    @Column({ default: 0 })
    sortOrder: number

}

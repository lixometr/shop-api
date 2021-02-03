import { EntityDefaultBlueprint } from "src/internal";
import { Column, Entity } from "typeorm";

@Entity()
export class File extends EntityDefaultBlueprint {

    // Relative path like /public/image.png
    @Column()
    path: string;

    // Full path like https://site.com/public/image.png
    @Column()
    url: string;

    // image.png
    @Column()
    name: string;
}
import { Column, Entity } from "typeorm";
import { EntityDefaultBlueprint } from "src/internal";

@Entity()
export class Image extends EntityDefaultBlueprint { 

      // Relative path like /public/image.png
      @Column()
      path: string;
  
      // Full path like https://site.com/public/image.png
      @Column()
      url: string;
  
      // image.png
      @Column()
      name: string;

      @Column({nullable: true})
      alt: string;
}


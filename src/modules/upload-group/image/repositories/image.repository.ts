import { DefaultRepository } from "src/internal";
import { EntityRepository } from "typeorm";
import { Image } from "../entities/image.entity";

@EntityRepository(Image)
export class ImageRepository extends DefaultRepository<Image> {

}
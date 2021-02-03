import { DefaultRepository } from "src/internal";
import { EntityRepository } from "typeorm";
import { File } from "../entities/file.entity";

@EntityRepository(File)
export class FileRepository extends DefaultRepository<File> {

}
import { DefaultRepository } from "src/blueprints";
import { EntityRepository } from "typeorm";
import { Promocode } from "../entities/promocode.entity";

@EntityRepository(Promocode)
export class PromocodeRepository extends DefaultRepository<Promocode>{

}
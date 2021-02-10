import { DefaultRepository } from "src/blueprints";
import { EntityRepository } from "typeorm";
import { Promocode } from "../entities/promocode.entity";
import { PromocodeName } from "../promocode.constants";

@EntityRepository(Promocode)
export class PromocodeRepository extends DefaultRepository<Promocode>{
    public name = PromocodeName
}
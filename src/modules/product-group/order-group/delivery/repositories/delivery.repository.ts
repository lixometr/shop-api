import { DefaultRepository } from "src/blueprints";
import { RequestPayload } from "src/internal";
import { EntityRepository } from "typeorm";
import { DeliveryName } from "../delivery.constants";
import { Delivery } from "../entities/delivery.entity";

@EntityRepository(Delivery)
export class DeliveryRepository extends DefaultRepository<Delivery> {
    public name = DeliveryName

    findByType({ type }: { type: string }, payload: RequestPayload) {
        payload.setPagination({
            perPage: -1,
            page: 1
        })
        const query = this.createQueryBuilder(this.name)
            .where('type = :type', {type})
        return this.findMany(query, payload)
    }
    findAvailable({}, payload: RequestPayload) {
        payload.setPagination({
            perPage: -1,
            page: 1
        })
        const query = this.createQueryBuilder(this.name)
        return this.findMany(query, payload)
    }
}
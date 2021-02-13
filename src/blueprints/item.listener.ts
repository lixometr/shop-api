import { BadRequestException, Injectable } from "@nestjs/common";
import { ID, RequestPayload } from "src/internal";
import { EntityItemBlueprint } from "./item.entity";
import { ServiceBlueprint } from "./service";

@Injectable()
export class ListenerItemBlueprint {
    constructor(private service: ServiceBlueprint<any>) {
    }
    async preCreate({ data, payload }: { data: any, payload: RequestPayload }): Promise<boolean>{
        const slug = data.slug
        const item = await this.service.findBySlug({ slug }, payload)
        if (item) {
            throw new BadRequestException('Item with such slug is already exists')
        }
        return true
    }
    async preUpdate({ data, id, payload }: { data: any, id: ID, payload: RequestPayload }): Promise<boolean> {
        const item = await this.service.findById({id}, payload)
        if(item.slug === data.slug) return true
        return this.preCreate({ data, payload })
    }
}
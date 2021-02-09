import { BadRequestException, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ID, RequestPayload } from "src/internal";
import { EventName } from "src/internal";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductService } from "./product.service";

@Injectable()
export class ProductListenerService {
    constructor(private itemService: ProductService) {
    }
    @OnEvent(`product.${EventName.beforeCreate}`)
    async preCreate({ data, payload }: { data: CreateProductDto, payload: RequestPayload }) {
        const slug = data.slug
        const item = await this.itemService.findBySlug({ slug }, payload)
        if (item) {
            throw new BadRequestException('Item with such slug is already exists')
        }
    }
    @OnEvent(`product.${EventName.beforeUpdate}`)
    async preUpdate({ data, id, payload }: { data: CreateProductDto, id: ID, payload: RequestPayload }) {
        const item = await this.itemService.findById({id}, payload)
        if(item.slug === data.slug) return
        return this.preCreate({ data, payload })
    }
}
import { BadRequestException, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ID, RequestPayload } from "src/internal";
import { EventName } from "src/internal";
import { CreateProductCategoryDto } from "./dto/create-product-category.dto";
import { ProductCategoryService } from "./product-category.service";

@Injectable()
export class ProductCategoryListenerService {
    constructor(private itemService: ProductCategoryService) {
    }
    @OnEvent(`product-category.${EventName.beforeCreate}`)
    async preCreate({ data, payload }: { data: CreateProductCategoryDto, payload: RequestPayload }) {
        const slug = data.slug
        const item = await this.itemService.findBySlug({ slug }, payload)
        if (item) {
            throw new BadRequestException('Item with such slug is already exists')
        }
    }
    @OnEvent(`product-category.${EventName.beforeUpdate}`)
    async preUpdate({ data, id, payload }: { data: CreateProductCategoryDto, id: ID, payload: RequestPayload }) {
        const item = await this.itemService.findById({id}, payload)
        if(item.slug === data.slug) return
        return this.preCreate({ data, payload })
    }
}
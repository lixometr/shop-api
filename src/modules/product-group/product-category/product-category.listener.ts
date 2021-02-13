import { BadRequestException, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ListenerItemBlueprint } from "src/blueprints";
import { ID, RequestPayload } from "src/internal";
import { EventName } from "src/internal";
import { CreateProductCategoryDto } from "./dto/create-product-category.dto";
import { ProductCategoryName } from "./product-category.constants";
import { ProductCategoryService } from "./product-category.service";

@Injectable()
export class ProductCategoryListenerService extends ListenerItemBlueprint {
    public name = ProductCategoryName
    constructor(private itemService: ProductCategoryService) {
        super(itemService)
    }
    @OnEvent(`${ProductCategoryName}.${EventName.beforeCreate}`)
    async preCreate({ data, payload }: { data: CreateProductCategoryDto, payload: RequestPayload }) {
        return super.preCreate({ data, payload })
    }
    @OnEvent(`${ProductCategoryName}.${EventName.beforeUpdate}`)
    async preUpdate({ data, id, payload }: { data: CreateProductCategoryDto, id: ID, payload: RequestPayload }) {
        return super.preUpdate({ data, id, payload })
    }
}
import { BadRequestException, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ListenerItemBlueprint } from "src/blueprints";
import { ID, RequestPayload } from "src/internal";
import { EventName } from "src/internal";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductName } from "./product.constants";
import { ProductService } from "./product.service";

@Injectable()
export class ProductListenerService extends ListenerItemBlueprint {
    public name = ProductName
    constructor(private itemService: ProductService) {
        super(itemService)
    }
    @OnEvent(`${ProductName}.${EventName.beforeCreate}`)
    async preCreate({ data, payload }: { data: CreateProductDto, payload: RequestPayload }) {
        return super.preCreate({ data, payload })
    }
    @OnEvent(`${ProductName}.${EventName.beforeUpdate}`)
    async preUpdate({ data, id, payload }: { data: CreateProductDto, id: ID, payload: RequestPayload }) {
        return super.preUpdate({ data, payload, id })
    }
}
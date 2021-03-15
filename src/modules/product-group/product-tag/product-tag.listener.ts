import { BadRequestException, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ListenerItemBlueprint } from "src/blueprints";
import { ID, RequestPayload } from "src/internal";
import { EventName } from "src/internal";
import { CreateProductTagDto } from "./dto/create-product-tag.dto";
import { ProductTagName } from "./product-tag.constants";
import { ProductTagService } from "./product-tag.service";

@Injectable()
export class ProductTagListenerService extends ListenerItemBlueprint {
    public name = ProductTagName
    constructor(private itemService: ProductTagService, ) {
        super(itemService)
    }
    @OnEvent(`${ProductTagName}.${EventName.beforeCreate}`)
    async preCreate({ data, payload }: { data: CreateProductTagDto, payload: RequestPayload }) {
        return super.preCreate({ data, payload })
    }
    @OnEvent(`${ProductTagName}.${EventName.beforeUpdate}`)
    async preUpdate({ data, id, payload }: { data: CreateProductTagDto, id: ID, payload: RequestPayload }) {
        return super.preUpdate({ data, id, payload })
    }
   
}
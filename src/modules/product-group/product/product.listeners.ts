import { BadRequestException, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ListenerItemBlueprint } from "src/blueprints";
import { ID, RequestPayload } from "src/internal";
import { EventName } from "src/internal";
import { ImageService } from "src/modules/upload-group/image/image.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductName } from "./product.constants";
import { ProductService } from "./product.service";

@Injectable()
export class ProductListenersService extends ListenerItemBlueprint {
    public name = ProductName
    constructor(private itemService: ProductService, private imageService: ImageService) {
        super(itemService)
    }
    @OnEvent(`${ProductName}.${EventName.beforeCreate}`)
    async preCreate({ data, payload }: { data: CreateProductDto, payload: RequestPayload }) {
        return super.preCreate({ data, payload })
    }
    @OnEvent(`${ProductName}.${EventName.beforeUpdate}`)
    async preUpdate({ data, id, payload }: { data: UpdateProductDto, id: ID, payload: RequestPayload }) {
        return super.preUpdate({ data, payload, id })
    }
    @OnEvent(`${ProductName}.${EventName.beforeRemove}`)
    async beforeRemove({ id, payload }) {
        const item = await this.itemService.findById({ id }, payload)
        if (!item) return
        const resolvers = item.images.map(async image => {
            return await this.imageService.removeById({ id: image.id }, payload)
        })
        resolvers.push(this.imageService.removeById({ id: item.defaultImage.id }, payload))
        await Promise.all(resolvers)
    }
}
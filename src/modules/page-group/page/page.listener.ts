import { BadRequestException, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ID, ListenerItemBlueprint, RequestPayload } from "src/internal";
import { EventName } from "src/internal";
import { CreatePageDto } from "./dto/create-page.dto";
import { PageName } from "./page.constants";
import { PageService } from "./page.service";

@Injectable()
export class PageListenerService extends ListenerItemBlueprint{
    public name = PageName
    constructor(private itemService: PageService) {
        super(itemService)
    }
    @OnEvent(`${PageName}.${EventName.beforeCreate}`)
    async preCreate(data: { data: CreatePageDto, payload: RequestPayload }) {
        return super.preCreate(data)
    }
    @OnEvent(`${PageName}.${EventName.beforeUpdate}`)
    async preUpdate(data: { data: CreatePageDto, id: ID, payload: RequestPayload }) {
        return super.preUpdate(data)
    }
}
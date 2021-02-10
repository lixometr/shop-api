import { BadRequestException, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ID, ListenerItemBlueprint, RequestPayload } from "src/internal";
import { EventName } from "src/internal";
import { PageTemplateName } from "../page-template/page-template.constants";
import { CreatePageDto } from "./dto/create-page.dto";
import { Page } from "./entities/page.entity";
import { PageService } from "./page.service";

@Injectable()
export class PageListenerService extends ListenerItemBlueprint{
    public name = PageTemplateName
    constructor(private itemService: PageService) {
        super(itemService)
    }
    @OnEvent(`page.${EventName.beforeCreate}`)
    async preCreate(data: { data: CreatePageDto, payload: RequestPayload }) {
        return super.preCreate(data)
    }
    @OnEvent(`page.${EventName.beforeUpdate}`)
    async preUpdate(data: { data: CreatePageDto, id: ID, payload: RequestPayload }) {
        return super.preUpdate(data)
    }
}
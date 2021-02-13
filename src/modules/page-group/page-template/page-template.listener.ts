import {  Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ID, ListenerItemBlueprint, RequestPayload } from "src/internal";
import { EventName } from "src/internal";
import { CreatePageTemplateDto } from "./dto/create-page-template.dto";
import { PageTemplateName } from "./page-template.constants";
import { PageTemplateService } from "./page-template.service";

@Injectable()
export class PageTemplateListenerService extends ListenerItemBlueprint{
    public name = PageTemplateName
    constructor(private itemService: PageTemplateService) {
        super(itemService)
    }
    @OnEvent(`${PageTemplateName}.${EventName.beforeCreate}`)
    async preCreate(data: { data: CreatePageTemplateDto, payload: RequestPayload }) {
        return super.preCreate(data)
    }
    @OnEvent(`${PageTemplateName}.${EventName.beforeUpdate}`)
    async preUpdate(data: { data: CreatePageTemplateDto, id: ID, payload: RequestPayload }) {
        return super.preUpdate(data)
    }
}
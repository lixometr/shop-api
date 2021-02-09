import { BadRequestException, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ID, ListenerItemBlueprint, RequestPayload } from "src/internal";
import { EventName } from "src/internal";
import { CreatePageTemplateDto } from "./dto/create-page-template.dto";
import { PageTemplate } from "./entities/page-template.entity";
import { PageTemplateService } from "./page-template.service";

@Injectable()
export class PageTemplateListenerService extends ListenerItemBlueprint{
    constructor(private itemService: PageTemplateService) {
        super(itemService)
    }
    @OnEvent(`page-template.${EventName.beforeCreate}`)
    async preCreate(data: { data: CreatePageTemplateDto, payload: RequestPayload }) {
        return super.preCreate(data)
    }
    @OnEvent(`page-template.${EventName.beforeUpdate}`)
    async preUpdate(data: { data: CreatePageTemplateDto, id: ID, payload: RequestPayload }) {
        return super.preUpdate(data)
    }
}
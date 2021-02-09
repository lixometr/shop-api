import {  Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ID, ListenerItemBlueprint, RequestPayload } from "src/internal";
import { EventName } from "src/internal";
import { CreateSectionPageDto } from "./dto/create-section-page.dto";
import { SectionPageService } from "./section-page.service";

@Injectable()
export class SectionPageListenerService extends ListenerItemBlueprint {
    constructor(private itemService: SectionPageService) {
        super(itemService)
    }
    @OnEvent(`section-page.${EventName.beforeCreate}`)
    async preCreate(data: { data: CreateSectionPageDto, payload: RequestPayload }) {
        return super.preCreate(data)
    }
    @OnEvent(`section-page.${EventName.beforeUpdate}`)
    async preUpdate(data: { data: CreateSectionPageDto, id: ID, payload: RequestPayload }) {
        return super.preUpdate(data)
    }
}
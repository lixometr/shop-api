import { BadRequestException, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ID, ListenerItemBlueprint, RequestPayload } from "src/internal";
import { EventName } from "src/internal";
import { CreateSectionDto } from "./dto/create-section.dto";
import { Section } from "./entities/section.entity";
import { SectionName } from "./section.constants";
import { SectionService } from "./section.service";

@Injectable()
export class SectionListenerService extends ListenerItemBlueprint{
    public name = SectionName
    constructor(private itemService: SectionService) {
        super(itemService)
    }
    @OnEvent(`section.${EventName.beforeCreate}`)
    async preCreate(data: { data: CreateSectionDto, payload: RequestPayload }) {
        return super.preCreate(data)
    }
    @OnEvent(`section.${EventName.beforeUpdate}`)
    async preUpdate(data: { data: CreateSectionDto, id: ID, payload: RequestPayload }) {
        return super.preUpdate(data)
    }
}
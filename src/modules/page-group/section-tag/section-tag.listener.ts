import { Injectable } from "@nestjs/common"
import { OnEvent } from "@nestjs/event-emitter"
import { EventName, ID, ListenerItemBlueprint, RequestPayload } from "src/internal"
import { CreateSectionTagDto } from "./dto/create-section-tag.dto"
import { SectionTagName } from "./section-tag.constants"
import { SectionTagService } from "./section-tag.service"

@Injectable()
export class SectionTagListenerService extends ListenerItemBlueprint {
    public name = SectionTagName
    constructor(private itemService: SectionTagService) {
        super(itemService)
    }
    @OnEvent(`${SectionTagName}.${EventName.beforeCreate}`)
    async preCreate({ data, payload }: { data: CreateSectionTagDto, payload: RequestPayload }) {
        return super.preCreate({ data, payload })
    }
    @OnEvent(`${SectionTagName}.${EventName.beforeUpdate}`)
    async preUpdate({ data, id, payload }: { data: CreateSectionTagDto, id: ID, payload: RequestPayload }) {
        return super.preUpdate({ data, id, payload })
    }
    
}
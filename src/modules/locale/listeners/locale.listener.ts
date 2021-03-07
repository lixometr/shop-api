import {  Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ID, ListenerItemBlueprint, RequestPayload } from "src/internal";
import { EventName } from "src/internal";
import { LocaleName } from "../locale.constants";
import { LocaleService } from "../locale.service";
import {CreateLocaleDto} from "../dto/create-locale.dto"
@Injectable()
export class LocaleListenerService extends ListenerItemBlueprint {
    public name = LocaleName
    constructor(private itemService: LocaleService) {
        super(itemService)
    }
    @OnEvent(`${LocaleName}.${EventName.beforeCreate}`)
    async preCreate(data: { data: CreateLocaleDto, payload: RequestPayload }) {
        return super.preCreate(data)
    }
    @OnEvent(`${LocaleName}.${EventName.beforeUpdate}`)
    async preUpdate(data: { data: CreateLocaleDto, id: ID, payload: RequestPayload }) {
        return super.preUpdate(data)
    }
}
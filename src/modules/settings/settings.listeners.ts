import { BadRequestException, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ListenerItemBlueprint } from "src/blueprints";
import { ID, RequestPayload } from "src/internal";
import { EventName } from "src/internal";
import { CreateSettingDto } from "./dto/create-setting.dto";
import { SettingsService } from "./settings.service";
import { SettingsName } from "./settings.constants";

@Injectable()
export class SettingsListeners extends ListenerItemBlueprint {
    public name = SettingsName
    constructor(private itemService: SettingsService) {
        super(itemService)
    }
    @OnEvent(`${SettingsName}.${EventName.beforeCreate}`)
    async preCreate({ data, payload }: { data: CreateSettingDto, payload: RequestPayload }) {
        return super.preCreate({ data, payload })
    }
    @OnEvent(`${SettingsName}.${EventName.beforeUpdate}`)
    async preUpdate({ data, id, payload }: { data: CreateSettingDto, id: ID, payload: RequestPayload }) {
        return super.preUpdate({ data, payload, id })
    }
}
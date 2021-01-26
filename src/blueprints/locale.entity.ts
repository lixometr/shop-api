
import { LOCALE_PROP } from "src/constants";
import { ID, SerializeGroup } from "src/internal";
import * as _ from "lodash"
import { Exclude } from "class-transformer";
import { EntityBaseMetadata, RequestPayload } from "src/internal";
import { EntityBase, EntityDefaultBlueprint, EntityItemBlueprint } from "./index"
export interface EntityLocale extends EntityBase {
    translate(localeId: ID, defaultLocaleId: ID, recursive?: boolean): void
    _canTranslate: true
}

const mixin = (Base) => class EntityLocale extends Base {

    public _catTranslate = true
    constructor() {
        super()
    }
    translate(localeId: ID, defaultLocaleId?: ID, recursive: boolean = true): void {
        const _translate = (arr: Array<any>): object => {
            let localeItemIdx = arr.findIndex(item => item.localeId === localeId)
            if (localeItemIdx < 0) {
                localeItemIdx = arr.findIndex(item => item.localeId === defaultLocaleId)
            }
            if (localeItemIdx < 0) {
                return {}
            }
            return arr[localeItemIdx] && arr[localeItemIdx].values
        }
        const _merge = (target: object, field: object): void => {
            target = _.merge(target, field)
            delete target[LOCALE_PROP]
        }

        const recursiveTranslate = function t(target) {
            const props = Object.keys(target)
            props.map(prop => {
                const value = target[prop]
                if (prop === LOCALE_PROP) {
                    const toTranslate = _translate(target[prop])
                    _merge(target, toTranslate)
                    return
                }
                if (!recursive) return
                if (_.isArray(value)) {
                    value.map(val => {
                        if (_.isObject(val)) {
                            t(val)
                        }
                    })
                }
                if (_.isObject(value)) {
                    t(value)
                }
            })
        }
        recursiveTranslate(this)
    }
    async serialize(metadata: EntityBaseMetadata, payload: RequestPayload): Promise<this> {
        if (metadata.groups.includes(SerializeGroup.Translate)) {
            const localeId = payload.request.settings.locale.id
            const defaultLocaleId = payload.request.settings.defaultLocale.id
            if (localeId || defaultLocaleId) {
                this.translate(localeId, defaultLocaleId)
            }
        }
        return super.serialize(metadata, payload)
    }
};

export class EntityLocaleDefaultBlueprint extends mixin(EntityDefaultBlueprint) {
    @Exclude()
    _catTranslate: true
}
export class EntityLocaleItemBlueprint extends mixin(EntityItemBlueprint) {
    @Exclude()
    _catTranslate: true
}

export type EntityLocaleBlueprint = EntityLocaleDefaultBlueprint & EntityLocaleItemBlueprint
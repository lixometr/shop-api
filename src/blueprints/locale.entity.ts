import { LOCALE_PROP } from "src/constants";
import { ID, SerializeGroup } from "src/internal";
import * as _ from "lodash"
import { Exclude } from "class-transformer";
import {  RequestPayload } from "src/internal";
import { EntityBase, EntityDefaultBlueprint, EntityItemBlueprint } from "./index"
export interface EntityLocale extends EntityBase {
    translate(localeId: ID, recursive?: boolean): void
    _canTranslate: true
}
type Constructor<T = EntityBase> = new (...args: any[]) => T

const mixin = <TBase extends Constructor>(Base: TBase) => class EntityLocale extends Base {

    public _canTranslate = true
    constructor(...args: any[]) {
        super(...args)
    }
    translate(localeId: ID, recursive: boolean = true): void {
        const _translate = (arr: Array<any>): any => {
            let localeItemIdx = arr.findIndex(item => item.localeId === localeId)
            if (localeItemIdx < 0) {
                return {}
            }
            return arr[localeItemIdx]
        }
        const _merge = (target: object, field: object): void => {
            target = _.merge(target, field)
            // delete target[LOCALE_PROP]
        }

        const recursiveTranslate = function t(target) {
            const props = Object.keys(target)
            props.map(prop => {
                const value = target[prop]
                if (prop === LOCALE_PROP) {
                    const toTranslate = {..._translate(target[prop])}
                    delete toTranslate.localeId
                    delete toTranslate.id
                    delete toTranslate.itemId
                    
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
    async serialize(payload: RequestPayload): Promise<this> {
        if (payload.getGroups().includes(SerializeGroup.Translate)) {
            const localeId = payload.getLocale().id
            if (localeId) {
                this.translate(localeId)
            }
        }
        return super.serialize( payload)
    }
};

export class EntityLocaleDefaultBlueprint extends mixin(EntityDefaultBlueprint) {
    @Exclude()
    _canTranslate: true
}
export class EntityLocaleItemBlueprint extends mixin(EntityItemBlueprint) {
    @Exclude()
    _canTranslate: true
}

export type EntityLocaleBlueprint = EntityLocaleDefaultBlueprint & EntityLocaleItemBlueprint
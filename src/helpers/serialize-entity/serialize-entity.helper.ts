import { classToClass, classToPlain, deserialize, serialize } from "class-transformer";
import { EntityBase, RequestPayload } from "src/internal";
export async function serializeEntity<T extends EntityBase>({ entity }: { entity: T }, payload: RequestPayload): Promise<any> {
    await entity.serialize(payload)
    const serialized = classToPlain(entity, { groups: payload.getGroups() })

    return serialized
}
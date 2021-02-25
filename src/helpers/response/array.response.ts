import { EntityBase } from "src/internal"
import { RequestPayload } from "src/internal"

export class ArrayResponse<T extends EntityBase> extends EntityBase {
    public items: Array<T>
    constructor(items: Array<T>) {
        super()
        this.items = items
    }
    async serialize(payload: RequestPayload) {
        const resolvers = this.items.map(item => item.serialize(payload))
        this.items = await Promise.all(resolvers)
        return this
    }
    async changeItems(fn: Function) {
        this.items = await fn(this.items)
    }
}
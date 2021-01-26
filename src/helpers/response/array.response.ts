import { EntityBase } from "src/internal"

export class ArrayResponse<T extends EntityBase> extends EntityBase {
    public items: Array<T>
    constructor(items: Array<T>) {
        super()
        this.items = items
    }
    async serialize(metadata, payload) {
        const resolvers = this.items.map(item => item.serialize(metadata, payload))
        this.items = await Promise.all(resolvers)
        return this
    }
    async changeItems(fn: Function) {
        this.items = await fn(this.items)
    }
}
import { OrderByDto } from "./order-by.dto"

export interface IOrderBy {
    [prop: string]: 'ASC' | 'DESC'
}

export class OrderByEntity {
    private orderBy: Array<string>
    private order: Array<'ASC' | 'DESC'>
    constructor({ order, orderBy }: OrderByDto) {
        const defaultOrderBy = ['createdAt']
        const defaultOrder: ('ASC' | 'DESC')[] = ['DESC']
        this.orderBy = [...defaultOrderBy, ...orderBy]
        this.order = [...defaultOrder, ...order]

    }
    getFields(namespace?: string): IOrderBy {
        const fields = {}
        this.orderBy.forEach((prop, idx) => {
            let value = this.order[idx] || 'DESC'
            let currentProp = prop
            if (namespace) {
                currentProp = namespace + '.' + prop
            }
            fields[currentProp] = value
        })
        return fields
    }

}
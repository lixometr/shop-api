import { EntityBase,  IPagination, RequestPayload } from "src/internal";

export class PaginationInfoDto {
    perPage: number;
    nowPage: number;
    totalItems: number;
    totalPages: number;
}

export class PaginationResponse<T extends EntityBase> extends EntityBase implements IPagination<T>{

    public items: Array<T>
    public info: PaginationInfoDto;
    constructor(item: IPagination<T>) {
        super()
        Object.assign(this, item)
    }

    async serialize(payload: RequestPayload) {
        const resolvers = this.items.map((item: T) => item.serialize(payload))
        const items = await Promise.all(resolvers)
        this.items = items
        return super.serialize(payload)

    }
}

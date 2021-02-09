import { Inject, Injectable, Optional, Scope } from '@nestjs/common';
import { DefaultRepository, ID, PaginationResponse, PaginationDto, SLUG } from 'src/internal';
import { EntityBase } from "./base.entity"
import { DeleteResult, } from 'typeorm';
import _ from "lodash"
import { RequestPayload } from 'src/internal';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EventName } from 'src/internal';


@Injectable()
export class ServiceBlueprint<T extends EntityBase>{
    public name = ''
    constructor(private repository: Partial<DefaultRepository<any>>, private event: EventEmitter2) { }

    async create({ data }: { data: any }, payload: RequestPayload): Promise<any> {
        await this.event.emitAsync(`${this.name}.${EventName.beforeCreate}`, { data, payload })
        const result = await this.repository.save(this.repository.create(data))
        await this.event.emitAsync(`${this.name}.${EventName.afterCreate}`, { result, data, payload })
        return result
    }

    async findAll({ }, payload: RequestPayload): Promise<PaginationResponse<T>> {
        await this.event.emitAsync(`${this.name}.${EventName.beforeFindAll}`, { payload })

        const result = await this.findWithPagination({
            query: {}
        }, payload)
        await this.event.emitAsync(`${this.name}.${EventName.afterFindAll}`, { result, payload })
        return result

    }
    async findWithPagination({ query }: { query: object }, payload: RequestPayload): Promise<PaginationResponse<T>> {
        return await this.repository.findWithPagination(query, payload)
    }


    async findById({ id }: { id: ID }, payload?: RequestPayload): Promise<T> {
        await this.event.emitAsync(`${this.name}.${EventName.beforeFindById}`, { id, payload })
        const result: any = await this.repository.findById({ id })
        await this.event.emitAsync(`${this.name}.${EventName.afterFindById}`, { result, payload })
        return result
    }


    async updateById({ id, data }: { id: ID, data: any }, payload: RequestPayload): Promise<T> {
        await this.event.emitAsync(`${this.name}.${EventName.beforeUpdate}`, { data, id, payload })
        const item = await this.repository.findById({
            id
        });
        if (!item) return
        await this.repository.save({
            ...item, // existing fields
            ...data // updated fields
        });
        const result = await this.repository.findById({
            id
        });
        await this.event.emitAsync(`${this.name}.${EventName.afterUpdate}`, { result, data, payload })
        return result
    }
    async findBySlug({ slug }: { slug: SLUG }, payload: RequestPayload): Promise<T> {
        await this.event.emitAsync(`${this.name}.${EventName.beforeFindBySlug}`, { slug, payload })
        const result = await this.repository.findBySlug({ slug })
        await this.event.emitAsync(`${this.name}.${EventName.afterFindBySlug}`, { slug, result, payload })
        return result
    }
    async removeById({ id }: { id: ID, }, payload: RequestPayload): Promise<DeleteResult> {
        await this.event.emitAsync(`${this.name}.${EventName.beforeRemove}`, { id, payload })
        const result = await this.repository.deleteById({ id })
        await this.event.emitAsync(`${this.name}.${EventName.afterRemove}`, { result, id, payload })
        return result
    }
}

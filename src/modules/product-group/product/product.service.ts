import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

import { ServiceBlueprint } from 'src/blueprints/service';
import { RequestPayload } from 'src/internal';
import { ID } from 'src/internal';
import { EventName } from 'src/types';
import { Product } from './entities/product.entity';
import { ProductName } from './product.constants';
import { ProductRepository } from './repositories/product.repository';

@Injectable()
export class ProductService extends ServiceBlueprint<Product>{
    public name = ProductName
    constructor(private productRepository: ProductRepository, private eventEmiter: EventEmitter2) { super(productRepository, eventEmiter) }

    async findByCategoryId({ id }: { id: ID }, payload: RequestPayload) {
        return this.productRepository.findByCategoryIdWithFilters({ id }, payload)
    }
    async findAllWithFilters({ }, payload: RequestPayload) {
        await this.eventEmiter.emitAsync(`${this.name}.${EventName.beforeFindAll}`, { payload })
        const result = await this.productRepository.findAllWithFilters({}, payload)
        await this.eventEmiter.emitAsync(`${this.name}.${EventName.afterFindAll}`, { result, payload })
        return result
    }

    async findSimilarItems({id}: {id: ID}, payload: RequestPayload) {
        return this.productRepository.findSimilarItems({id}, payload)
    }

}

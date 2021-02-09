import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { RequestPayload } from 'src/helpers';
import { ID, ProductCategory } from 'src/internal';
import { ProductCategoryRepository } from './repositories/category.repository';

@Injectable()
export class ProductCategoryService extends ServiceBlueprint<ProductCategory>{
  public name = 'product-category'
  constructor(private itemRepository: ProductCategoryRepository, private eventEmiter: EventEmitter2) { super(itemRepository, eventEmiter) }

  findTrees({ }) {
    return this.itemRepository.findTrees()
  }
  async findBreadcrumbsById({ id }: { id: ID }) {
    return await this.itemRepository.findBreadcrumbsById({ id })
  }
  async findChildrenById({ id }: { id: ID }) {
    return await this.itemRepository.findChildrenById({ id })
  }
  async findChildrenTreeById({ id }: { id: ID }) {
    return await this.itemRepository.findChildrenTreeById({ id })
  }
  async findParentsById({ id }: { id: ID }) {
    return this.itemRepository.findParentsById({ id })
  }

  async findParentsTreeById({ id }: { id: ID }) {
    return this.itemRepository.findParentsTreeById({ id })
  }
  async findProductsById({ id }, payload: RequestPayload) {
    return this.itemRepository.findProductsById({ id })
  }
}

import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { CreateProductAttributeDto } from './dto/create-product-attribute.dto';
import { UpdateProductAttributeDto } from './dto/update-product-attribute.dto';
import { ProductAttribute } from './entities/product-attribute.entity';
import { ProductAttributeRepository } from './repositories/product-attribute.repository';

@Injectable()
export class ProductAttributeService extends ServiceBlueprint<ProductAttribute>{
  public name = 'productAttribute'
  constructor(private productAttrRepository: ProductAttributeRepository, private eventEmiter: EventEmitter2) {super(productAttrRepository, eventEmiter)}
}

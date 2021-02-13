import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { RequestPayload } from 'src/internal';
import { EventName } from 'src/internal';
import { Promocode } from 'src/internal';
import { ProductService } from '../../product/product.service';
import { PromocodeService } from '../../promocode/promocode.service';
import { OrderBo } from './bo/order.bo';
import { CreateOrderProductDto, ToCreateOrderProductDto } from './dto/create-order-product.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { ToCreateOrderDto } from './dto/to-create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { OrderName } from './order.constants';
import { OrderRepository } from './repositories/order.repository';

@Injectable()
export class OrderService extends ServiceBlueprint<Order>{
  public name = OrderName
  constructor(private itemRepository: OrderRepository, private eventEmiter: EventEmitter2, private promocodeService: PromocodeService, private productService: ProductService) { super(itemRepository, eventEmiter) }

  async make({ data }: { data: ToCreateOrderDto }, payload: RequestPayload) {
    await this.eventEmiter.emitAsync(`${this.name}.${EventName.beforeCreate}`, { data, payload })
    const user = payload.getUser()
    const productsToCreate = data.products || []
    const locale = payload.getLocale()
    const currency = payload.getCurrency()
    const promocodeName = data.promocode
    const promocode = await this.makePromocode({ promocode: promocodeName }, payload)
    const products = await this.makeProducts({ products: productsToCreate }, payload)
    const toCreate = {
      currency,
      locale,
      user,
      products,
      promocode
    }
    await this.create({ data: toCreate }, payload)
    await this.eventEmiter.emitAsync(`${this.name}.${EventName.afterCreate}`, { data, payload })
  }



  serializeOrder({ order }: { order: CreateOrderDto }, paylaod: RequestPayload) {

  }
  async makeProducts({ products }: { products: ToCreateOrderProductDto[] }, payload: RequestPayload): Promise<CreateOrderProductDto[]> {
    const resolvers = products.map(async toCreateOrderProduct => {
      const productId = toCreateOrderProduct.product.id
      const product = await this.productService.findById({ id: productId }, payload)
      let orderProduct: CreateOrderProductDto = { ...toCreateOrderProduct, product }
      return orderProduct
    })
    const orderProducts = await Promise.all(resolvers)
    return orderProducts
  }
  async makePromocode({ promocode }: { promocode: string }, payload: RequestPayload): Promise<Promocode> {
    let item = await this.promocodeService.findByName({ name: promocode }, payload)
    if (!item) return null
    const validPromo = await this.validatePromocode({ promocode: item }, payload)
    if (!validPromo) return null
    return item
  }

  async validatePromocode({ promocode }: { promocode: Promocode }, payload: RequestPayload): Promise<boolean> {
    return this.promocodeService.canUse({ promocode }, payload)
  }

  generateOrderId(): string {
    return ''
  }
}

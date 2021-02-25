import { BadRequestException, forwardRef, Inject, Injectable, ValidationPipe } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { Delivery, RequestPayload } from 'src/internal';
import { EventName } from 'src/internal';
import { Promocode } from 'src/internal';
import { ProductService } from '../../product/product.service';
import { PromocodeService } from '../../promocode/promocode.service';
import { OrderBo } from './bo/order.bo';
import { CreateOrderDeliveryDto } from './dto/create-order-delivery.dto';
import { CreateOrderProductDto, } from './dto/create-order-product.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { ToCreateOrderDto } from './dto/to-create-order.dto';
import { Order } from './entities/order.entity';
import { OrderName } from './order.constants';
import { OrderRepository } from './repositories/order.repository';
import { CreateOrderInfoDto } from './dto/create-order-info.dto';
import { CreateOrderPaymentTypeDto } from './dto/create-order-payment-type.dto';
import { validate, validateOrReject, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { uid } from 'uid/secure';
import { AppConfig } from 'src/config';
import { isNumber } from 'lodash';
import * as _ from 'lodash';

import { OrderResponse } from './order.response';
import { PaymentService } from '../payment/payment.service';
import { OrderStatus } from './order.types';
import { ToCreateOrderDeliveryDto } from './dto/to-create-order-delivery.dto';
import { ToCreateOrderProductDto } from './dto/to-create-order-product.dto';
import { DeliveryService } from '../delivery/delivery.service';
@Injectable()
export class OrderService extends ServiceBlueprint<Order>{
  public name = OrderName
  constructor(private itemRepository: OrderRepository,
    private eventEmiter: EventEmitter2,
    private promocodeService: PromocodeService,
    private productService: ProductService,
    private paymentService: PaymentService,
    private deliveryService: DeliveryService) { super(itemRepository, eventEmiter) }

  async make({ data }: { data: ToCreateOrderDto }, payload: RequestPayload) {
    await this.eventEmiter.emitAsync(`${this.name}.${EventName.beforeCreate}`, { data, payload })
    const user = await this.makeUser({}, payload)
    const productsToCreate = data.products || []

    const promocodeName = data.promocode
    const deliveryToCreate = data.delivery
    const payment = data.paymentType
    const dataInfo = data.info
    const locale = await this.makeLocale({}, payload)
    const currency = await this.makeCurrency({}, payload)
    const promocode = await this.makePromocode({ promocode: promocodeName }, payload)
    const products = await this.makeProducts({ products: productsToCreate }, payload)
    const delivery = await this.makeDelivery({ delivery: deliveryToCreate }, payload)
    const deliveryStrategy = this.getDeliveryStrategy({ delivery }, payload)
    const paymentStrategy = this.getPaymentStrategy({ payment }, payload)
    const paymentType = await this.makePaymentType({ payment }, payload)
    const orderId = await this.makeOrderId()
    const info = await this.makeInfo({ info: dataInfo }, payload)
    let toCreate: CreateOrderDto = {
      currency,
      locale,
      user,
      products,
      promocode,
      info,
      totalPrice: 0,
      delivery,
      paymentType,
      orderId
    }
    const totalPrice = await this.makeTotalPrice({ order: toCreate }, payload)
    toCreate.totalPrice = totalPrice
    if (!locale || !currency || !products || !delivery || !paymentType || !orderId || !isNumber(totalPrice) || !info) throw new BadRequestException('Some date is not provided')

    toCreate = await this.makeOrderFromPlain({ order: toCreate }, payload)
    if (!toCreate) throw new BadRequestException('Error while creating order')
    const result = await this.create({ data: toCreate }, payload)
    return new OrderResponse({
      payment: await paymentStrategy.toResponse({ order: result }),
      delivery: await deliveryStrategy.toResponse({ order: result }),
      order: result
    })
  }
  async doPay({ orderId }) {
    const order = await this.findByOrderId({ orderId })
    order.status = OrderStatus.payed
    await this.itemRepository.save(order)
  }
  async doError({ orderId }) {
    const order = await this.findByOrderId({ orderId })
    order.status = OrderStatus.error;
    await this.itemRepository.save(order)
  }

  async findByOrderId({ orderId }) {
    return this.itemRepository.findByOrderId({ orderId })
  }
  async makeUser({ }, payload: RequestPayload) {
    const user = payload.getUser()
    if (!user || _.isEmpty(user)) return null
    return await user.serialize(payload)
  }
  async makeLocale({ }, payload: RequestPayload) {
    const locale = payload.getLocale()
    if (!locale || _.isEmpty(locale)) return null
    return await locale.serialize(payload)
  }
  async makeCurrency({ }, payload: RequestPayload) {
    const currency = payload.getCurrency()
    if (!currency || _.isEmpty(currency)) return null
    return await currency.serialize(payload)
  }
  async makeInfo({ info }, payload: RequestPayload): Promise<CreateOrderInfoDto> {
    return info
  }
  async makeTotalPrice({ order }, payload: RequestPayload): Promise<number> {
    return new OrderBo({ order }).getTotalPrice()
  }

  async makeOrderFromPlain({ order }: { order: CreateOrderDto }, payload: RequestPayload) {
    const orderDto = await this.transformOrder({ order }, payload)
    const isValid = await this.validateOrder({ order: orderDto }, payload)
    if (!isValid) return null
    return orderDto
  }
  async transformOrder({ order }: { order: CreateOrderDto }, paylaod: RequestPayload) {
    const result = plainToClass(CreateOrderDto, order, { exposeDefaultValues: true })
    return result
  }
  async validateOrder({ order }: { order: CreateOrderDto }, paylaod: RequestPayload): Promise<boolean> {
    try {
      await validateOrReject(order, { whitelist: true })
      return true
    } catch (err: any) {
      console.log('Error while validating order', err)
      return false
    }
  }
  async makeDelivery({ delivery }: { delivery: ToCreateOrderDeliveryDto }, payload: RequestPayload): Promise<Delivery> {
    const deliveryItem = await this.deliveryService.findById({ id: delivery.id })
    if (!deliveryItem) throw new BadRequestException('Delivery not found')
    await deliveryItem.serialize(payload)
    const deliveryStrategy = this.getDeliveryStrategy({ delivery: deliveryItem }, payload)
    return deliveryStrategy.getInfo()
  }
  getDeliveryStrategy({ delivery }: { delivery: Delivery }, payload: RequestPayload) {
    return this.deliveryService.getContext({  delivery }, payload)
  }
  getPaymentStrategy({ payment }: { payment: string }, payload: RequestPayload) {
    return this.paymentService.getContext({ strategy: payment }, payload)
  }
  async makePaymentType({ payment }: { payment: string }, payload: RequestPayload): Promise<CreateOrderPaymentTypeDto> {
    return this.getPaymentStrategy({ payment }, payload).getInfo()

  }
  async makeProducts({ products }: { products: ToCreateOrderProductDto[] }, payload: RequestPayload): Promise<CreateOrderProductDto[]> {
    const resolvers = products.map(async toCreateOrderProduct => {
      const productId = toCreateOrderProduct.product.id
      const product = await this.productService.findById({ id: productId }, payload)
      if (!product) return
      await product.serialize(payload)
      let orderProduct: CreateOrderProductDto = { ...toCreateOrderProduct, product, }
      return orderProduct
    })
    let orderProducts = await Promise.all(resolvers)
    orderProducts = orderProducts.filter(item => !!item)
    return orderProducts
  }
  async makePromocode({ promocode }: { promocode: string }, payload: RequestPayload): Promise<Promocode> {
    let item = await this.promocodeService.findByName({ name: promocode }, payload)
    if (!item) return null
    const validPromo = await this.validatePromocode({ promocode: item }, payload)
    if (!validPromo) return null

    return await item.serialize(payload)
  }

  async validatePromocode({ promocode }: { promocode: Promocode }, payload: RequestPayload): Promise<boolean> {
    return this.promocodeService.canUse({ promocode }, payload)
  }

  async makeOrderId(): Promise<string> {
    return uid(AppConfig.get<number>('order.orderIdLength'))
  }
}

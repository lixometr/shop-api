import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RequestPayload } from 'src/internal';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentName } from './payment.constants';
import { PaymentIntegrationTypes } from './payment.types';
import { PaymentContext } from './strategies/payment-context';

@Injectable()
export class PaymentService {
    name = PaymentName
    constructor(private eventEmiter: EventEmitter2,) { }
    async paymentResult({ type, data }: { type: PaymentIntegrationTypes, data: any }, payload: RequestPayload) {
        const paymentStrategy = new PaymentContext(type)
        return paymentStrategy.onResult({ data }, payload)
    }
  

    getContext({ strategy }: { strategy: string }, payload: RequestPayload) {
        return new PaymentContext(strategy)
    }
}

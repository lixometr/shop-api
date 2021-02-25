import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "eventemitter2";
import { AppConfig } from "src/config";
import { RequestPayload } from "src/helpers";
import { PaymentEventName, PaymentName } from "src/internal";
import { uid } from "uid/secure";
// import { OrderService } from "../../../order/order.service";
import { PaymentService } from "../../payment.service"
import { PaymentIntegrationTypes } from "../../payment.types";
import { IStrategyOrder, PaymentIntegrationStrategy } from "../payment-integration.stategy";
const paypal = require('paypal-rest-sdk');
interface IPaypalPayment {
    transactions: Array<{description: string}>
}
@Injectable()
export class PaymentPaypalStrategy extends PaymentIntegrationStrategy {
    public name = PaymentIntegrationTypes.paypal
    public paypal = paypal
    constructor(public paymentService: PaymentService, public eventEmiter: EventEmitter2) {
        super(paymentService, eventEmiter)

        this.paypal.configure({
            mode: 'live',
            client_id: AppConfig.get<string>('paypal.paypal.privateKey'),
            client_secret: AppConfig.get<string>('payment.paypal.clientId')
        })

    }
    async generatePaymentLink({ order }: { order: IStrategyOrder }) {
        const orderId = order.orderId
        const currency = order.currency.iso
        const totalPrice = order.totalPrice
        const baseUrl = AppConfig.get<string>('domain.baseUrl')
        let create_payment_json = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": `${baseUrl}/payment/success?type=paypal&orderId=${orderId}`,
                "cancel_url": baseUrl
            },
            "transactions": [{
                "item_list": {

                },
                "amount": {
                    "currency": currency,
                    "total": totalPrice,
                },
                "description": orderId
            }]
        };

        const link = await new Promise((resolve: (value: string) => void, reject) => {
            interface PaypalPaymentResult {
                links: Array<{ method: string, href: string }>
            }
            this.paypal.payment.create(create_payment_json, function (error: any, payment: PaypalPaymentResult) {
                if (error) {
                    console.log('error in paypal', error)
                    reject(error)
                } else {
                    console.log("Create Payment Response");
                    console.log(payment);
                    const link = payment.links.find(link => link.method.toLowerCase() === 'redirect')
                    resolve(link.href)
                }
            });
        })
        return link
    }
    async execute(id: string, data) {
        return new Promise((resolve, reject) => {
            this.paypal.payment.execute(id, data, function (error, payment) {
                if (error) {
                    console.log(error.response);
                    reject(error)
                } else {
                    resolve(payment)
                }
            })
        })
    }
    checkEvent(headers, body, webhookId) {
        var eventBody = JSON.stringify(body)
        return new Promise(resolve => {
            this.paypal.notification.webhookEvent.verify(headers, eventBody, webhookId, function (error, response) {
                if (error) {
                    console.log(error)
                    resolve(false)
                } else {
                    console.log(response);

                    // Verification status must be SUCCESS
                    if (response.verification_status === "SUCCESS") {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                }
            });
        })

    }
    getPaymentInfo(id: string): Promise<IPaypalPayment>{
        return new Promise((resolve, reject) => {
            this.paypal.payment.get(id, function (error, invoice) {
                if (error) {
                    reject(error)
                } else {
                    console.log("Get Invoice Response");
                    resolve(invoice)
                }
            });
        })
    }

    async onResult({ data }, payload: RequestPayload) {
        const req = payload.request
        const paypalId = data.resource.id
        console.log('GOT WEBHOOK', data)
        if (data.event_type !== 'PAYMENTS.PAYMENT.CREATED') return false
        const webHookId = AppConfig.get<string>('payment.paypal.webhookId');
        const isValid = await this.checkEvent(req.headers, data, webHookId)
        if (!isValid) return false
        const info = await this.getPaymentInfo(paypalId)
        console.log("INFO", info)

        await this.paypal.execute(paypalId, {
            transactions: data.transactions,
            payer_id: data.resource.payer.payer_info.payer_id
        })
        const orderId = info.transactions[0].description
        await this.eventEmiter.emitAsync(`${PaymentName}.${PaymentEventName.payed}`, { orderId })
        return true
    }
}
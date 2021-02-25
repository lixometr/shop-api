import { PaymentPaypalStrategy } from "./strategies/integration-strategies/payment-paypal.strategy";
import { PaymentCashStrategy } from "./strategies/payment-cash.strategy";
import { PaymentInvoiceStrategy } from "./strategies/payment-invoice.strategy";

export enum PaymentTypes {
    cash = 'cash',
    integration = 'integration',
    invoice = 'invoice'
}

export enum PaymentIntegrationTypes {
    paypal = 'paypal',
    unitpay = 'unitpay',
    payop = 'payop'
}
export enum PaymentEventName {
    payed = 'payed',
    error = 'error'
}
export const PaymentStrategies = {
    [PaymentTypes.cash]: PaymentCashStrategy,
    [PaymentTypes.invoice]: PaymentInvoiceStrategy,
    [PaymentIntegrationTypes.paypal]: PaymentPaypalStrategy
}
import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SettingsService } from 'src/modules/settings/settings.service';
import { LocaleService } from 'src/modules/locale/locale.service';
import { RequestPayload, SettingsNames } from 'src/internal';
import { CurrencyService } from 'src/modules/product-group/currency/currency.service';
import { CLASS_SERIALIZER_OPTIONS } from '@nestjs/common/serializer/class-serializer.constants';

@Injectable()
export class SettingsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, @Inject(SettingsService) private settingsService, @Inject(LocaleService) private localeService: LocaleService, @Inject(CurrencyService) private currencyService: CurrencyService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        if (!req.settings) req.settings = {}
        const options = this.reflector.getAllAndOverride(CLASS_SERIALIZER_OPTIONS, [
            context.getHandler(),
            context.getClass(),
        ]) || {}
        const groups = options.groups || []
        const { query } = req
        const { headers } = req
        // Язык передаем в хедер x-language или в query
        const localeSlug = headers['x-language'] || query.locale
        let locale = await this.localeService.findBySlug({ slug: localeSlug }, new RequestPayload({ request: req, groups }))
        if (!locale) {
            const defaultLocale = await this.settingsService.findBySlug({ slug: SettingsNames.localeDefault })
            const defaultLocaleId = defaultLocale?.value
            locale = await this.localeService.findById({ id: defaultLocaleId })
        }
        req.settings.locale = locale || {}

        const currencySlug = headers['x-currency'] || query.currency
        let currency = await this.currencyService.findBySlug({ slug: currencySlug }, new RequestPayload({ request: req, groups }))
        if (!currency) {
            const defaultCurrency = await this.settingsService.findBySlug({ slug: SettingsNames.currencyDefault })
            const defaultCurrencyId = defaultCurrency?.value
            currency = await this.currencyService.findById({ id: defaultCurrencyId })
        }
        req.settings.currency = currency || {}


        return true
    }
}
import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SettingsService } from 'src/modules/settings/settings.service';
import { LOCALE_DEFAULT_SLUG } from 'src/constants';
import { LocaleService } from 'src/modules/locale/locale.service';
import { RequestPayload } from 'src/internal';

@Injectable()
export class SettingsGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, @Inject(SettingsService) private settingsService, @Inject(LocaleService) private localeService: LocaleService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        if(!req.settings) req.settings = {}
        const { query } = req
        const {headers} = req
        // Язык передаем в хедер x-language или в query
        const localeSlug = headers['x-language'] || query.locale
        const locale = await this.localeService.findBySlug({slug: localeSlug}, new RequestPayload({request: req}))
        req.settings.locale = locale || {}
        

        const defaultLocaleId = await this.settingsService.findBySlug({slug: LOCALE_DEFAULT_SLUG})
        const defaultLocale = await this.localeService.findById({id: defaultLocaleId})
        req.settings.defaultLocale = defaultLocale || {}
        return true
    }
}
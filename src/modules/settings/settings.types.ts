export enum SettingsNames {
    localeDefault = 'locale-default',
    currencyDefault = 'currency-default',
    useNDS = 'use-nds',
    sendPulseUserId = 'sendpulse-user-id',
    sendPulseSecret = 'sendpulse-secret',
    sendPulseFromEmail = 'sendpulse-from-email'
}

export const SecuredSettings: string[] = [
    SettingsNames.sendPulseUserId,
    SettingsNames.sendPulseSecret,
    SettingsNames.useNDS,
]
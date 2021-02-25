import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { join } from "path";
import * as sendpulse from "sendpulse-api"
import { RequestPayload, SettingsNames } from "src/internal";
import { SettingsService } from "../settings/settings.service";
interface SendProps {
    html: string
    subject?: string
    from?: {
        name?: string
        email: string
    },
    bcc?: [
        {
            name?: string
            email: string
        },
    ]
}
interface SendOne extends SendProps {
    to: string
}
interface SendMany extends SendProps {
    to: [
        {
            name?: string,
            email: string
        },
    ],
}
@Injectable()
export class MailService {
    public sender: typeof sendpulse
    private fromEmail: string
    constructor(private settingsService: SettingsService) { }
    async init({ }, payload: RequestPayload) {
        const SUserId = await this.settingsService.findBySlug({ slug: SettingsNames.sendPulseUserId, internal: true }, payload)
        const SSecret = await this.settingsService.findBySlug({ slug: SettingsNames.sendPulseSecret, internal: true }, payload)
        const SFromEmail = await this.settingsService.findBySlug({ slug: SettingsNames.sendPulseFromEmail, internal: true }, payload)
        const userId = SUserId?.value
        const secret = SSecret?.value
        this.fromEmail = SFromEmail?.value
        if (!userId) throw new InternalServerErrorException('SendPulse userId is not provided')
        if (!secret) throw new InternalServerErrorException('SendPulse secret is not provided')
        if (!this.fromEmail) throw new InternalServerErrorException('SendPulse from email is not provided')

        this.sender = sendpulse
        return new Promise((resolve, reject) => {
            sendpulse.init(userId, secret, join(__dirname, '..', '..', '..', 'tmp'), () => {
                resolve(undefined)
            })
        })
    }
    private sendCallback(res: Function, rej: Function) {
        return (data: any) => {
            console.log('On SendPulse result', data)
            if (data.error) {
                console.log('Sendpulse error', data)
                return rej(data)
            }
            res(data)
        }
    }
    async send(mail: SendOne, payload: RequestPayload) {
        await this.init({}, payload)
        const toSend = { ...mail, to: [{ email: mail.to }] }
        if (!toSend.from) {
            toSend.from = {
                email: this.fromEmail,
                name: "Test"
            }
        }
        return new Promise((resolve, reject) => {
            return this.sender.smtpSendMail(this.sendCallback(resolve, reject), toSend)
        })
    }
    async sendTemplate(templateName: string) {

    }
    call(method: string, ...args: any) {
        return this.sender[method](...args)
    }
}
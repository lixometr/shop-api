import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { EventName, OrderName } from "src/internal";
import { MailService } from "./mail.service";

@Injectable()
export class MailListenersService {
    constructor(private mailService: MailService) { }
    @OnEvent(`${OrderName}.${EventName.afterCreate}`)
    async afterOrderCreate({ payload }) {
        this.mailService.send({
            html: "Hello!",
            to: 'lixometr@gmail.com',
            subject: "It's me!"
        }, payload).catch(err => console.log('doesnt matter xD', err))
    }
}
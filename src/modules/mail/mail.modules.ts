import { Global, Module } from '@nestjs/common';
import { MailListenersService } from './mail.listeners';
import { MailService } from './mail.service';

@Global()
@Module({
    providers: [MailService, MailListenersService],
    exports: [MailService]
})
export class MailModule {};
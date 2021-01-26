import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
const providers = [
    EventEmitterModule.forRoot({
        maxListeners: 10,
        verboseMemoryLeak: true,
        wildcard: true
    })
]
@Module({
    imports: [...providers],
    exports: [...providers]
})
export class EventEmiterModule {
    
}

import { Module } from '@nestjs/common';
import { serveStaticProviders } from './serve-static.providers';

@Module({
    imports: [...serveStaticProviders],
    exports: [...serveStaticProviders]
})
export class ServeStaticModule {

}

import { ServeStaticModule } from '@nestjs/serve-static';
import { AppConfig } from 'src/config';

export const serveStaticProviders = [
    ServeStaticModule.forRoot({
        rootPath: AppConfig.get<string>('static.path'),
        serveRoot: AppConfig.get<string>('static.root'),
        renderPath: '_'
    }),
]
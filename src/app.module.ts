import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { LocaleModule } from './modules/locale/locale.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { SerializeInterceptor } from './interceptors/serialize.interceptor';
import { SettingsModule } from './modules/settings/settings.module';
import { SettingsGuard } from './guards/settings.guard';
import { AppClassSerializerInterceptor } from "./interceptors/classSerializer.interceptor"
import { DatabaseFilter } from "./modules/database/database.filter"
import { ServeStaticModule } from './modules/serve-static/serve-static.module';
import { EventEmiterModule } from './modules/event-emiter/event-emiter.module';
import { GlobalListeners } from './helpers/global-listeners/global-listeners.listeners';
import { UploadModuleGroup } from './modules/upload-group/upload-group.module';
import { UserGroupModule } from './modules/user-group/user-group.module';
import { AuthGroupModule } from './modules/auth-group/auth-group.module';
import { ProductGroupModule } from './modules/product-group/product-group.module';
import { PageGroupModule } from './modules/page-group/page-group.module';
@Module({
  imports: [ServeStaticModule, EventEmiterModule, DatabaseModule,  UserGroupModule, AuthGroupModule, LocaleModule, SettingsModule, UploadModuleGroup, ProductGroupModule, PageGroupModule ],
  controllers: [AppController],
  providers: [
    { provide: APP_FILTER, useClass: DatabaseFilter },
    { provide: APP_INTERCEPTOR, useClass: AppClassSerializerInterceptor },
    { provide: APP_INTERCEPTOR, useClass: SerializeInterceptor },
    { provide: APP_GUARD, useClass: SettingsGuard },
    GlobalListeners,
    AppService],
})
export class AppModule { }

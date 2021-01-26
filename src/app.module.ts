import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/product/product.module';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/userModule/user/user.module';
import { AuthModule } from './modules/authModule/auth/auth.module';
import { UserAdminModule } from './modules/userModule/userAdmin/userAdmin.module';
import { AuthAdminModule } from './modules/authModule/authAdmin/authAdmin.module';
import { ProductTagModule } from './modules/product-tag/product-tag.module';
import { LocaleModule } from './modules/locale/locale.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { SerializeInterceptor } from './interceptors/serialize.interceptor';
import { SettingsModule } from './modules/settings/settings.module';
import { SettingsGuard } from './guards/settings.guard';
import { AppClassSerializerInterceptor } from "./interceptors/classSerializer.interceptor"
import { DatabaseFilter } from "./modules/database/database.filter"
import { ProductAttributeModule } from './modules/product-attribute/product-attribute.module';
import { ProductCategoryModule } from './modules/product-category/product-category.module';
import { AttributeValueModule } from './modules/attribute-value/attribute-value.module';
import { AttributeModule } from './modules/attribute/attribute.module';
import { ServeStaticModule } from './modules/serve-static/serve-static.module';
import { EventEmiterModule } from './modules/event-emiter/event-emiter.module';
import { GlobalListeners } from './helpers/global-listeners/global-listeners.listeners';
import { PageModule } from './modules/page/page.module';
import { PageTemplateModule } from './modules/page-template/page-template.module';
@Module({
  imports: [ServeStaticModule, EventEmiterModule, DatabaseModule, ProductModule, UserModule, UserAdminModule, AuthModule, AuthAdminModule, ProductTagModule, LocaleModule, SettingsModule, ProductAttributeModule, ProductCategoryModule, AttributeModule, AttributeValueModule, PageModule, PageTemplateModule], 
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

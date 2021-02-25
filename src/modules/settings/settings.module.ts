import { Global, Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsRepository } from './repositories/settings.repository';
import { SettingsListeners } from './settings.listeners';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([SettingsRepository])],
  controllers: [SettingsController],
  providers: [ SettingsService, SettingsListeners],
  exports: [SettingsService]
})
export class SettingsModule {}

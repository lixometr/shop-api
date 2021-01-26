import { Global, Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Settings } from './entities/settings.entity';
import { SettingsRepository } from './repositories/settings.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SettingsRepository])],
  controllers: [SettingsController],
  providers: [ SettingsService],
  exports: [SettingsService]
})
export class SettingsModule {}

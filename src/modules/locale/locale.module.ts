import { Module } from '@nestjs/common';
import { LocaleService } from './locale.service';
import { LocaleController } from './locale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocaleRepository } from './repositories/locale.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LocaleRepository])],
  controllers: [LocaleController],
  providers: [LocaleService],
  exports: [LocaleService]
})
export class LocaleModule {}

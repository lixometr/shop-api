import { Global, Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyRepository } from './repositories/currency.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([CurrencyRepository])],
  controllers: [CurrencyController],
  providers: [CurrencyService],
  exports: [CurrencyService]
})
export class CurrencyModule {}

import { Module } from '@nestjs/common';
import { PromocodeService } from './promocode.service';
import { PromocodeController } from './promocode.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromocodeRepository } from './repositories/promocode.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PromocodeRepository])],
  controllers: [PromocodeController],
  providers: [PromocodeService],
  exports: [PromocodeService]
})
export class PromocodeModule {}

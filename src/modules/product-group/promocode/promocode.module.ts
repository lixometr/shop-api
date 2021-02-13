import { Module } from '@nestjs/common';
import { PromocodeService } from './promocode.service';
import { PromocodeController } from './promocode.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromocodeRepository } from './repositories/promocode.repository';
import { PromocodeUsedPerUser } from './entities/promocode.used.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PromocodeRepository, PromocodeUsedPerUser])],
  controllers: [PromocodeController],
  providers: [PromocodeService],
  exports: [PromocodeService]
})
export class PromocodeModule {}

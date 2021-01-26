import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { PageRepository } from './repository/page.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PageRepository])],
  controllers: [PageController],
  providers: [PageService],
  exports: [PageService]
})
export class PageModule {}

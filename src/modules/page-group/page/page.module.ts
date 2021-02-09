import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageController } from './page.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageRepository } from './repository/page.repository';
import { PageListenerService } from './page.listener';

@Module({
  imports: [TypeOrmModule.forFeature([PageRepository])],
  controllers: [PageController],
  providers: [PageService, PageListenerService],
  exports: [PageService]
})
export class PageModule {}

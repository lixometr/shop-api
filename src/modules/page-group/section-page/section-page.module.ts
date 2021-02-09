import { Module } from '@nestjs/common';
import { SectionPageService } from './section-page.service';
import { SectionPageController } from './section-page.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionPageRepository } from './repository/section-page.repository';
import { SectionPageListenerService } from './section-page.listener';

@Module({
  imports: [TypeOrmModule.forFeature([SectionPageRepository])],
  controllers: [SectionPageController],
  providers: [SectionPageService, SectionPageListenerService],
  exports: [SectionPageService]
})
export class SectionPageModule {}

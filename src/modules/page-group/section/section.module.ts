import { forwardRef, Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionRepository } from './repository/section.repository';
import { SectionPageModule } from '../section-page/section-page.module';
import { SectionListenerService } from './section.listener';

@Module({
  imports: [TypeOrmModule.forFeature([SectionRepository]), forwardRef(() => SectionPageModule)],
  controllers: [SectionController],
  providers: [SectionService, SectionListenerService],
  exports: [SectionService]
})
export class SectionModule {}

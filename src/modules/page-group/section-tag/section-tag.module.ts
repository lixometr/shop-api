import { Module } from '@nestjs/common';
import { SectionTagService } from './section-tag.service';
import { SectionTagController } from './section-tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectionTagRepository } from './repository/section-tag.repository';
import { SectionTagListenerService } from './section-tag.listener';

@Module({
  imports: [TypeOrmModule.forFeature([SectionTagRepository])],
  controllers: [SectionTagController],
  providers: [SectionTagService, SectionTagListenerService],
  exports: [SectionTagService]
})
export class SectionTagModule {}

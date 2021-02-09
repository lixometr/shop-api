import { Module } from '@nestjs/common';
import { PageTemplateService } from './page-template.service';
import { PageTemplateController } from './page-template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageTemplateRepository } from './repository/page-template.repository';
import { PageTemplateListenerService } from './page-template.listener';

@Module({
  imports: [TypeOrmModule.forFeature([PageTemplateRepository])],
  controllers: [PageTemplateController],
  providers: [PageTemplateService, PageTemplateListenerService],
  exports: [PageTemplateService]
})
export class PageTemplateModule {}

import { Module } from '@nestjs/common';
import { WidgetService } from './widget.service';
import { WidgetController } from './widget.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WidgetRepository } from './repositories/widget.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WidgetRepository])],
  controllers: [WidgetController],
  providers: [WidgetService],
  exports: [WidgetService]
})
export class WidgetModule {}

import { Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeRepository } from './repositories/attribute.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AttributeRepository])],
  controllers: [AttributeController],
  providers: [AttributeService],
  exports: [AttributeService]
})
export class AttributeModule {}

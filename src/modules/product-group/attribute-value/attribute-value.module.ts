import { Module } from '@nestjs/common';
import { AttributeValueService } from './attribute-value.service';
import { AttributeValueController } from './attribute-value.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeValueRepository } from './repositories/attribute-value.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AttributeValueRepository])],
  controllers: [AttributeValueController],
  providers: [AttributeValueService],
  exports: [AttributeValueService]
})
export class AttributeValueModule {}

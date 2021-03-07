import { forwardRef, Module } from '@nestjs/common';
import { AttributeService } from './attribute.service';
import { AttributeController } from './attribute.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttributeRepository } from './repositories/attribute.repository';
import { AttributeValueModule } from '../attribute-value/attribute-value.module';

@Module({
  imports: [TypeOrmModule.forFeature([AttributeRepository]), forwardRef(() => AttributeValueModule)],
  controllers: [AttributeController],
  providers: [AttributeService],
  exports: [AttributeService]
})
export class AttributeModule { }

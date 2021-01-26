import { Module } from '@nestjs/common';
import { ProductTagService } from './product-tag.service';
import { ProductTagController } from './product-tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTag } from './entities/product-tag.entity';
import { ProductTagRepository } from './repository/product-tag.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTagRepository])],
  controllers: [ProductTagController],
  providers: [ProductTagService],
  exports: [ProductTagService]
})
export class ProductTagModule {}

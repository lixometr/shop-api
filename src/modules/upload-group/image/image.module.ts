import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageRepository } from './repositories/image.repository';
import { UploadPathService } from '../upload-path.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageRepository]),
  ],
  controllers: [ImageController],
  providers: [ImageService, UploadPathService],
  exports: [ImageService]
})
export class ImageModule {}

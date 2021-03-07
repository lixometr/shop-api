import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageRepository } from './repositories/image.repository';
import { UploadPathService } from '../upload-path.service';
import { UploadFileService } from '../upload-file.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImageRepository]),
  ],
  controllers: [ImageController],
  providers: [ImageService, UploadPathService, UploadFileService],
  exports: [ImageService]
})
export class ImageModule {}

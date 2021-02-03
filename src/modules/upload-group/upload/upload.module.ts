import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { ImageModule } from '../image/image.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [MulterModule.register(), ImageModule, FileModule],
  controllers: [UploadController],
  providers: [UploadService]
}) 
export class UploadModule {}
 
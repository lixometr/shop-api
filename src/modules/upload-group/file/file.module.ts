import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from './repositories/file.repository';
import { UploadPathService } from '../upload-path.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileRepository])
  ],
  controllers: [FileController],
  providers: [FileService, UploadPathService],
  exports: [FileService]
})
export class FileModule {}

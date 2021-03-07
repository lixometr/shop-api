import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetRequestPayload } from 'src/internal';
import { RequestPayload } from 'src/internal';
import { AppConfig } from 'src/config';
import { ImageService } from '../image/image.service';
import { FileService } from '../file/file.service';
import { diskStorage } from 'multer';
import { generateFilename } from '../upload.helpers';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
const multerParams: MulterOptions = {
  storage: diskStorage({
    destination: AppConfig.get<string>('upload.destination'),
    filename: generateFilename
  }),
  limits: {
    fileSize: AppConfig.get<number>('upload.maxFileSize') 
  }

}
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService, private imageService: ImageService, private fileService: FileService) { }
  @Post('image')
  @UseInterceptors(FileInterceptor('image', multerParams))
  uploadImage(@UploadedFile() file, @Body('alt') alt: string, @GetRequestPayload() requestPayload: RequestPayload) {
    if(!file) throw new BadRequestException()
    return this.imageService.upload({ file, alt }, requestPayload)
  } 
  @Post('file')
  @UseInterceptors(FileInterceptor('file', multerParams))
  upload(@UploadedFile() file, @GetRequestPayload() requestPayload: RequestPayload) {
    if(!file) throw new BadRequestException()

    return this.fileService.upload({ file }, requestPayload)
  }

}

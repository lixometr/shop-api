import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ServiceBlueprint } from 'src/blueprints/service';
import { RequestPayload } from 'src/internal';
import { UploadPathService } from '../upload-path.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { File } from './entities/file.entity';
import { FileRepository } from './repositories/file.repository';

@Injectable()
export class FileService extends ServiceBlueprint<File>{
  constructor(private itemRepository: FileRepository, private eventEmiter: EventEmitter2, private uploadPathService: UploadPathService) { super(itemRepository, eventEmiter) }

  async upload({ file }, payload: RequestPayload) {
    const { fullPath, relPath } = this.uploadPathService.makePath(file.filename)
    const data = {
      name: file.originalname,
      path: relPath,
      url: fullPath,
    }
    return await this.create({ data }, payload)
  }
}

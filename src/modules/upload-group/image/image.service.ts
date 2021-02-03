import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { info } from 'console';
import { ServiceBlueprint } from 'src/blueprints/service';
import { RequestPayload } from 'src/internal';
import { UploadPathService } from '../upload-path.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';
import { ImageRepository } from './repositories/image.repository';

@Injectable()
export class ImageService extends ServiceBlueprint<Image>{
  constructor(private itemRepository: ImageRepository, private eventEmiter: EventEmitter2, private uploadPathService: UploadPathService) {super(itemRepository, eventEmiter)}
  async upload({ file, alt }, payload: RequestPayload) {
    const {fullPath, relPath} = this.uploadPathService.makePath(file.filename)
    const data = {
      name: file.originalname,
      path: relPath,
      url: fullPath,
      alt
    }
    return await this.create({data}, payload)
  }
}

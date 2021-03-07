import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { info } from 'console';
import { ServiceBlueprint } from 'src/blueprints/service';
import { AppConfig } from 'src/config';
import { RequestPayload } from 'src/internal';
import { UploadFileService } from '../upload-file.service';
import { UploadPathService } from '../upload-path.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';
import { ImageRepository } from './repositories/image.repository';
import { join } from "path"
@Injectable()
export class ImageService extends ServiceBlueprint<Image>{
  constructor(private itemRepository: ImageRepository, private eventEmiter: EventEmitter2, private uploadPathService: UploadPathService, private uploadFileService: UploadFileService) { super(itemRepository, eventEmiter) }
  async upload({ file, alt }, payload: RequestPayload) {
    const { fullPath, relPath } = this.uploadPathService.makePath(file.filename)
    const data = {
      name: file.originalname,
      path: relPath,
      url: fullPath,
      alt
    }
    return await this.create({ data }, payload)
  }

  async removeById({ id }, payload: RequestPayload) {
    const item = await this.findById({ id }, payload)
    const deleteResult = await super.removeById({ id }, payload)
    const staticPath = AppConfig.get<string>('static.path')
    const path = join(staticPath, '..', item.path)
    await this.uploadFileService.removeFile({ path })
    return deleteResult
  }
}

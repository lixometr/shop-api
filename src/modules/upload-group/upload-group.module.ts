import { Module } from "@nestjs/common";
import { FileModule } from "./file/file.module";
import { ImageModule } from "./image/image.module";
import { UploadModule } from "./upload/upload.module";

@Module({
  imports: [UploadModule, ImageModule, FileModule],
  controllers: [],
  providers: [],
}) 
export class UploadModuleGroup {}
 
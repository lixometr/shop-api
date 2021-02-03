import { Injectable } from "@nestjs/common";
import { join, resolve } from "path"
import { AppConfig } from "src/config";

@Injectable()
export class UploadPathService {
    makePath(fileName: string, subPath = ''): { fullPath: string, relPath: string } {
        const publicFolder = AppConfig.get<string>('static.root')
        const baseUrl = AppConfig.get<string>('domain.baseUrl')
        let relPath = resolve(publicFolder, subPath, fileName)
        let fullPath = new URL(relPath, baseUrl).href
        return { fullPath, relPath }
    }
}
import { Inject, Injectable } from "@nestjs/common";
import { unlink } from "fs"
@Injectable()
export class UploadFileService {
    removeFile({ path }) {
        return new Promise((resolve, reject) => {
            unlink(path, err => {
                if (err) return reject(err)
                resolve(true)
            })
        })
    }
}
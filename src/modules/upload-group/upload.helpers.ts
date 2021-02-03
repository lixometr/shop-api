import { extname } from "path"
import { v4 as uuidv4 } from 'uuid';
export function generateFilename(req, file, cb) {
    cb(null, `${uuidv4()}${extname(file.originalname)}`)
}
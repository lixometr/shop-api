import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class ConfirmService {
    constructor() { }
    async generateKey() : Promise<string> {
        return uuidv4();
    }
}
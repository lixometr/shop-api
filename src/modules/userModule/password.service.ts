import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
    constructor() {}
    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(8);
        const hash = await bcrypt.hash(password, salt);
        return hash
    }
    async comparePassword(password: string, hash: string): Promise<boolean> {
       return await bcrypt.compare(password, hash);
    }
}
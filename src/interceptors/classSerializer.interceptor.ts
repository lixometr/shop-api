import { CallHandler, ClassSerializerInterceptor, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from "lodash"
@Injectable()
export class AppClassSerializerInterceptor extends ClassSerializerInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        // const options = super.getContextOptions(context)
        return super.intercept(context, next)
    }
}

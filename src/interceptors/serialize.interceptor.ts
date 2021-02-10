import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor, SerializeOptions } from '@nestjs/common';
import { Observable } from 'rxjs';
import { concatMap, map, switchMap } from 'rxjs/operators';
import * as _ from "lodash"
import { Reflector } from '@nestjs/core';
import { CLASS_SERIALIZER_OPTIONS } from "@nestjs/common/serializer/class-serializer.constants"
import { EntityBase, NoAuthRequest } from 'src/internal';
import { RequestPayload } from 'src/internal';

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) { }
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const req: NoAuthRequest = context.switchToHttp().getRequest()
    const options = this.reflector.getAllAndOverride(CLASS_SERIALIZER_OPTIONS, [
      context.getHandler(),
      context.getClass(),
    ]) || {}
    const groups = options.groups || []
    return next.handle().pipe(concatMap(async (data: EntityBase) => {
      if (data instanceof EntityBase) {
        return await data.serialize({ groups }, new RequestPayload({request: req, groups}))
      }
      return data
    }))
  }
}

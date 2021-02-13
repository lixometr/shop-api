import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CLASS_SERIALIZER_OPTIONS } from '@nestjs/common/serializer/class-serializer.constants';
import { AppRequest, RequestPayload } from 'src/internal';
import { Reflector } from '@nestjs/core';
export const GetRequestPayload = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request: AppRequest = ctx.switchToHttp().getRequest();
        const options = new Reflector().getAllAndOverride(CLASS_SERIALIZER_OPTIONS, [
            ctx.getHandler(),
            ctx.getClass(),
        ]) || {}
    
        const groups = options.groups || []
        return new RequestPayload({ request, groups})
    },
);
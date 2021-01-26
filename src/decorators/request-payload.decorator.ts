import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestPayload } from 'src/internal';

export const GetRequestPayload = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        return new RequestPayload({ request })
    },
);
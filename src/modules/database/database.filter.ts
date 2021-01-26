import { ArgumentsHost,  Catch, ExceptionFilter, HttpCode, HttpStatus } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DatabaseFilter extends BaseExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();

    response.json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: process.env.NODE_ENV === 'development' ? exception.message : '',
      error: exception.name,
      
    })
  }
}

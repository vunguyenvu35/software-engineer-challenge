import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

export const getStatusCode = (exception: unknown): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getErrorMessage = (exception: unknown): string | string[] => {
  let errors: string | string[];

  if (exception instanceof HttpException) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    errors = exception?.response?.message;
  } else if (exception.hasOwnProperty('message')) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let messages = exception.message;
    messages = Array.isArray(messages) ? messages : [messages];
    errors = messages;
  } else {
    errors = String(exception);
  }

  return errors;
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const statusCode = getStatusCode(exception);
    const msg = getErrorMessage(exception);
    const code = exception?.response?.response?.code || statusCode;

    // format body same api current
    const body = {
      code,
      msg,
      data: [],
    };

    // format http status = 200 same api current
    httpAdapter.reply(ctx.getResponse(), body, statusCode);
  }
}

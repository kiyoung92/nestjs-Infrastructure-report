import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { CustomLoggerService } from 'src/common/global-config/logger/custom-logger.service';
import { GlobalResponse } from 'src/common/responses/global-response';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: CustomLoggerService) {}
  catch(exception: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionToPlain = instanceToPlain(exception);

    const responseData = GlobalResponse.error({
      message: exceptionToPlain.message,
      statusCode: status,
    });

    if (status > 400 && status < 500) {
      this.logger.warn(
        `[${request.method}] ${exceptionToPlain.status} ► ${request.url} | ${exceptionToPlain.message}`,
        'GlobalExceptionHandler',
      );
    }

    if (status === 400) {
      this.logger.warn(
        `[${request.method}] ${exceptionToPlain.status} ► ${request.url} | ${exceptionToPlain.message}`,
        'GlobalExceptionHandler',
      );
      responseData.statusCode = HttpStatus.BAD_REQUEST;
      responseData.message = '잘못된 요청입니다.';
    }

    if (status >= 500) {
      this.logger.error(
        `[${request.method}] ${exceptionToPlain.status} ► ${request.url}`,
        exception.stack,
        'GlobalExceptionHandler',
      );

      if (exceptionToPlain.message) {
        responseData.message = exceptionToPlain.message;
      } else {
        responseData.message = '일시적인 오류가 발생하였습니다.';
      }
      responseData.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    if (exception.constructor.name === 'JsonWebTokenError') {
      responseData.statusCode = HttpStatus.UNAUTHORIZED;
      responseData.message = '로그인이 필요한 서비스입니다.';
    }

    response.status(status).json(responseData);
  }
}

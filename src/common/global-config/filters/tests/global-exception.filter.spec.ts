// global-exception.filter.spec.ts
import {
  BadRequestException,
  HttpStatus,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { CustomLoggerService } from 'src/common/global-config/logger/custom-logger.service';
import { GlobalResponse } from 'src/common/responses/global-response';

import { GlobalExceptionFilter } from '../global-exception-filter/global-exception.filter';

describe('GlobalExceptionFilter', () => {
  let exceptionFilter: GlobalExceptionFilter;
  let logger: CustomLoggerService;
  let mockResponse: Partial<Response>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        GlobalExceptionFilter,
        {
          provide: CustomLoggerService,
          useValue: {
            verbose: jest.fn(),
            warn: jest.fn(),
            error: jest.fn(),
          },
        },
      ],
    }).compile();

    exceptionFilter = module.get(GlobalExceptionFilter);
    logger = module.get(CustomLoggerService);

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe('catch', () => {
    jest
      .spyOn(Date.prototype, 'toISOString')
      .mockReturnValue('2024-01-01T00:00:00.000Z');

    it('400', () => {
      const mockRequest = { method: 'GET', url: '/test' };
      const exception = new BadRequestException('잘못된 요청입니다.');

      const host = {
        switchToHttp: () => ({
          getResponse: () => mockResponse,
          getRequest: () => mockRequest,
        }),
      } as any;

      exceptionFilter.catch(exception, host);

      expect(logger.warn).toHaveBeenCalledWith(
        '[GET] 400 ► /test | 잘못된 요청입니다.',
        'GlobalExceptionHandler',
      );
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
      expect(mockResponse.json).toHaveBeenCalledWith(
        GlobalResponse.error({
          message: '잘못된 요청입니다.',
          statusCode: HttpStatus.BAD_REQUEST,
        }),
      );
    });

    it('401 ~ 499', () => {
      const mockRequest = { method: 'GET', url: '/test' };
      const exception = new UnauthorizedException('Unauthorized');

      const host = {
        switchToHttp: () => ({
          getResponse: () => mockResponse,
          getRequest: () => mockRequest,
        }),
      } as any;

      exceptionFilter.catch(exception, host);

      expect(logger.warn).toHaveBeenCalledWith(
        '[GET] 401 ► /test | Unauthorized',
        'GlobalExceptionHandler',
      );
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
      expect(mockResponse.json).toHaveBeenCalledWith(
        GlobalResponse.error({
          message: 'Unauthorized',
          statusCode: HttpStatus.UNAUTHORIZED,
        }),
      );
    });

    it('500', () => {
      const mockRequest = { method: 'POST', url: '/test' };
      const exception = new InternalServerErrorException('Server error');

      const host = {
        switchToHttp: () => ({
          getResponse: () => mockResponse,
          getRequest: () => mockRequest,
        }),
      } as any;

      exceptionFilter.catch(exception, host);

      expect(logger.error).toHaveBeenCalledWith(
        `[${mockRequest.method}] 500 ► ${mockRequest.url}`,
        exception.stack,
        'GlobalExceptionHandler',
      );
      expect(mockResponse.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      expect(mockResponse.json).toHaveBeenCalledWith(
        GlobalResponse.error({
          message: '일시적인 오류가 발생하였습니다.',
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        }),
      );
    });

    it('401 (JsonWebTokenError)', () => {
      Object.defineProperty(UnauthorizedException, 'name', {
        value: 'JsonWebTokenError',
      });

      const mockRequest = { method: 'GET', url: '/protected' };
      const exception: Error = new UnauthorizedException();

      const host = {
        switchToHttp: () => ({
          getResponse: () => mockResponse,
          getRequest: () => mockRequest,
        }),
      } as any;

      exceptionFilter.catch(exception, host);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.UNAUTHORIZED);
      expect(mockResponse.json).toHaveBeenCalledWith(
        GlobalResponse.error({
          message: '로그인이 필요한 서비스입니다.',
          statusCode: HttpStatus.UNAUTHORIZED,
        }),
      );
    });
  });
});

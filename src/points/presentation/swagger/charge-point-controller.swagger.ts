import { getSchemaPath } from '@nestjs/swagger';
import { GlobalResponse } from 'src/common/responses/global-response';
import { ISwaggerMethodConfig } from 'src/common/swaggers/interfaces/swagger-config.interface';
import { dayjsUtil } from 'src/common/utils/dayjs.util';
import { PointResponseDto } from 'src/points/presentation/dtos/point-response.dto';

export const chargPointControllerSwaggerConfig: ISwaggerMethodConfig = {
  apiExtraModels: [GlobalResponse, PointResponseDto],
  apiOperation: {
    summary: '사용자 잔액 충전 API',
    description: '사용자의 잔액을 충전하는 API입니다.',
  },
  apiResponse: [
    {
      status: 201,
      description: '성공적으로 충전이 완료되었을 때 반환합니다.',
      schema: {
        allOf: [
          { $ref: getSchemaPath(GlobalResponse) },
          {
            properties: {
              status: {
                type: 'string',
                example: 'success',
                description: '응답 상태',
              },
              statusCode: {
                type: 'number',
                example: 201,
                description: 'HTTP 상태 코드',
              },
              message: {
                type: 'string',
                example: '포인트 충전이 완료되었습니다.',
                description: '성공 메세지',
              },
              timestamp: {
                type: 'string',
                example: new Date().toISOString(),
                description: '응답 시간',
              },
              data: {
                $ref: getSchemaPath(PointResponseDto),
                properties: {
                  updatedAt: {
                    type: 'string',
                    example: dayjsUtil.getTimestamp(),
                    description: '포인트 업데이트 시간',
                  },
                },
              },
            },
          },
        ],
      },
    },
    {
      status: 400,
      description: '요청이 잘못되었을 때 반환됩니다.',
      schema: {
        allOf: [
          { $ref: getSchemaPath(GlobalResponse) },
          {
            properties: {
              status: {
                type: 'string',
                example: 'fail',
                description: '응답 상태',
              },
              statusCode: {
                type: 'number',
                example: 400,
                description: 'HTTP 상태 코드',
              },
              message: {
                type: 'string',
                example: '잘못된 요청입니다.',
                description: '실패 메세지',
              },
              timestamp: {
                type: 'string',
                example: new Date().toISOString(),
                description: '응답 시간',
              },
              data: null,
            },
          },
        ],
      },
    },
    {
      status: 404,
      description: '사용자가 정보가 없을 때 반환됩니다.',
      schema: {
        allOf: [
          { $ref: getSchemaPath(GlobalResponse) },
          {
            properties: {
              status: {
                type: 'string',
                example: 'fail',
                description: '응답 상태',
              },
              statusCode: {
                type: 'number',
                example: 404,
                description: 'HTTP 상태 코드',
              },
              message: {
                type: 'string',
                example: '사용자 정보가 없습니다.',
                description: '실패 메세지',
              },
              timestamp: {
                type: 'string',
                example: new Date().toISOString(),
                description: '응답 시간',
              },
              data: null,
            },
          },
        ],
      },
    },
    {
      status: 404,
      description: '사용자가 정보가 없을 때 반환됩니다.',
      schema: {
        allOf: [
          { $ref: getSchemaPath(GlobalResponse) },
          {
            properties: {
              status: {
                type: 'string',
                example: 'error',
                description: '응답 상태',
              },
              statusCode: {
                type: 'number',
                example: 404,
                description: 'HTTP 상태 코드',
              },
              message: {
                type: 'string',
                example: '사용자 정보가 없습니다.',
                description: '에러 메시지',
              },
              timestamp: {
                type: 'string',
                example: new Date().toISOString(),
                description: '응답 시간',
              },
              data: null,
            },
          },
        ],
      },
    },
    {
      status: 422,
      description: '충전된 금액이 최대치를 초과했을 때 반환됩니다.',
      schema: {
        allOf: [
          { $ref: getSchemaPath(GlobalResponse) },
          {
            properties: {
              status: {
                type: 'string',
                example: 'fail',
                description: '응답 상태',
              },
              statusCode: {
                type: 'number',
                example: 422,
                description: 'HTTP 상태 코드',
              },
              message: {
                type: 'string',
                example: '포인트가 최대치를 초과하였습니다.',
                description: '실패 메세지',
              },
              timestamp: {
                type: 'string',
                example: new Date().toISOString(),
                description: '응답 시간',
              },
              data: null,
            },
          },
        ],
      },
    },
    {
      status: 500,
      description: '서버 에러가 발생했을 때 반환됩니다.',
      schema: {
        allOf: [
          { $ref: getSchemaPath(GlobalResponse) },
          {
            properties: {
              status: {
                type: 'string',
                example: 'error',
                description: '응답 상태',
              },
              statusCode: {
                type: 'number',
                example: 500,
                description: 'HTTP 상태 코드',
              },
              message: {
                type: 'string',
                example: '서버 에러가 발생했습니다.',
                description: '에러 메세지',
              },
              timestamp: {
                type: 'string',
                example: new Date().toISOString(),
                description: '응답 시간',
              },
              data: null,
            },
          },
        ],
      },
    },
  ],
};

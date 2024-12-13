import { getSchemaPath } from '@nestjs/swagger';
import { GlobalResponse } from 'src/common/responses/global-response';
import { ISwaggerConfig } from 'src/common/swaggers/interfaces/swagger-config.interface';
import { getTimestamp } from 'src/common/utils/dayjs.util';
import { PointResponseDto } from 'src/points/presentation/dtos/point-response.dto';

export const pointSwaggerConfig: ISwaggerConfig = {
  apiTags: 'Point',
  methods: {
    get: {
      apiExtraModels: [GlobalResponse, PointResponseDto],
      apiOperation: {
        summary: '사용자 잔액 조회 API',
        description: '사용자 잔액을 조회하는 API입니다.',
      },
      apiResponse: [
        {
          status: 200,
          description: '성공적으로 잔액을 조회했을 때 반환합니다.',
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
                    example: 200,
                    description: 'HTTP 상태 코드',
                  },
                  message: {
                    type: 'string',
                    example: '포인트 조회가 완료되었습니다.',
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
                        example: getTimestamp(),
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
                    example: '조회 중 오류가 발생하였습니다.',
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
      ],
    },
    charge: {
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
                  data: {
                    type: 'array',
                    items: {
                      $ref: getSchemaPath(PointResponseDto),
                    },
                  },
                },
              },
            ],
          },
        },
      ],
    },
  },
};

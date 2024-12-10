import { getSchemaPath } from '@nestjs/swagger';
import { GlobalResponse } from 'src/common/responses/global-response';
import { ISwaggerConfig } from 'src/common/swaggers/interfaces/swagger-config.interface';
import { PointResponseDto } from 'src/presentation/point/dtos/point-response.dto';

export const pointSwaggerConfig: ISwaggerConfig = {
  apiTags: 'Point',
  methods: {
    charge: {
      apiExtraModels: [GlobalResponse, PointResponseDto],
      apiOperation: {
        summary: '사용자 잔액 충전 API',
        description: '사용자의 잔액을 충전하는 API입니다.',
      },
      apiResponse: {
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
    },
    get: {
      apiExtraModels: [GlobalResponse, PointResponseDto],
      apiOperation: {
        summary: '사용자 잔액 조회 API',
        description: '사용자 잔액을 조회하는 API입니다.',
      },
      apiResponse: {
        status: 200,
        description: '성공적으로 잔액을 조회했을 때 반환합니다.',
        schema: {
          allOf: [
            { $ref: getSchemaPath(GlobalResponse) },
            {
              properties: {
                data: {
                  $ref: getSchemaPath(PointResponseDto),
                },
              },
            },
          ],
        },
      },
    },
  },
};

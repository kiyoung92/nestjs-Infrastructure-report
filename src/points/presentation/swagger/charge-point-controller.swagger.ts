import { getSchemaPath } from '@nestjs/swagger';
import { GlobalResponse } from 'src/common/responses/global-response';
import { ISwaggerMethodConfig } from 'src/common/swaggers/interfaces/swagger-config.interface';
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
};

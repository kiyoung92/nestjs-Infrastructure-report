import { getSchemaPath } from '@nestjs/swagger';
import { ISwaggerConfig } from 'src/application/interfaces/swagger-config.interface';
import { GlobalResponse } from 'src/infrastructure/response/global-response';
import { ProductResponseDto } from 'src/presentation/dtos/product/product-response.dto';

export const productSwaggerConfig: ISwaggerConfig = {
  apiTags: 'Products',
  methods: {
    findAll: {
      apiExtraModels: [GlobalResponse, ProductResponseDto],
      apiOperation: {
        summary: '모든 상품정보 조회 API',
        description: '모든 상품에 대한 정보를 목록으로 조회합니다.',
      },
      apiResponse: {
        status: 200,
        description: '성공적으로 상품정보를 조회했을 때 반환합니다.',
        schema: {
          allOf: [
            { $ref: getSchemaPath(GlobalResponse) },
            {
              properties: {
                data: {
                  type: 'array',
                  items: {
                    $ref: getSchemaPath(ProductResponseDto),
                  },
                },
              },
            },
          ],
        },
      },
    },
    findOne: {
      apiExtraModels: [GlobalResponse, ProductResponseDto],
      apiOperation: {
        summary: '상품정보 조회 API',
        description: '상품에 대한 정보를 목록으로 조회합니다.',
      },
      apiResponse: {
        status: 200,
        description: '성공적으로 상품정보를 조회했을 때 반환합니다.',
        schema: {
          allOf: [
            { $ref: getSchemaPath(GlobalResponse) },
            {
              properties: {
                data: {
                  $ref: getSchemaPath(ProductResponseDto),
                },
              },
            },
          ],
        },
      },
    },
    findTopSales: {
      apiExtraModels: [GlobalResponse, ProductResponseDto],
      apiOperation: {
        summary: '최근 3일간 판매량 상위 5개 조회 API',
        description:
          '최근 3일간 판매량 상위 5개의 상품 정보를 목록으로 조회합니다.',
      },
      apiResponse: {
        status: 200,
        description: '성공적으로 상품정보를 조회했을 때 반환합니다.',
        schema: {
          allOf: [
            { $ref: getSchemaPath(GlobalResponse) },
            {
              properties: {
                data: {
                  type: 'array',
                  items: {
                    $ref: getSchemaPath(ProductResponseDto),
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
};

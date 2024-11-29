import { getSchemaPath } from '@nestjs/swagger';
import { ISwaggerConfig } from 'src/application/interfaces/swagger-config.interface';
import { GlobalResponse } from 'src/infrastructure/response/global-response';
import { OrderResponseDto } from 'src/presentation/dtos/order/order-response.dto';

export const orderSwaggerConfig: ISwaggerConfig = {
  apiTags: 'Order',
  methods: {
    createOrder: {
      apiExtraModels: [GlobalResponse, OrderResponseDto],
      apiOperation: {
        summary: '주문 정보 생성 API',
        description: '사용자의 주문 정보를 생성하는 API입니다.',
      },
      apiResponse: {
        status: 201,
        description: '성공적으로 주문 정보를 생성했을 때 반환합니다.',
        schema: {
          allOf: [
            { $ref: getSchemaPath(GlobalResponse) },
            {
              properties: {
                data: {
                  $ref: getSchemaPath(OrderResponseDto),
                },
              },
            },
          ],
        },
      },
    },
  },
};

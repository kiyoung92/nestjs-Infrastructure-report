import { getSchemaPath } from '@nestjs/swagger';
import { ISwaggerConfig } from 'src/application/interfaces/swagger-config.interface';
import { GlobalResponse } from 'src/infrastructure/response/global-response';
import { PaymentResponseDto } from 'src/presentation/dtos/payment/payment-response.dto';

export const paymentSwaggerConfig: ISwaggerConfig = {
  apiTags: 'Payment',
  methods: {
    payment: {
      apiExtraModels: [GlobalResponse, PaymentResponseDto],
      apiOperation: {
        summary: '결제 API',
        description: '결제를 진행하는 API입니다.',
      },
      apiResponse: {
        status: 201,
        description: '성공적으로 결제가 완료되었을 때 반환합니다.',
        schema: {
          allOf: [
            { $ref: getSchemaPath(GlobalResponse) },
            {
              properties: {
                data: {
                  $ref: getSchemaPath(PaymentResponseDto),
                },
              },
            },
          ],
        },
      },
    },
  },
};

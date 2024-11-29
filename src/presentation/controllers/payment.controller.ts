import { Controller, HttpStatus, Post } from '@nestjs/common';
import { IPaymentController } from 'src/application/interfaces/controllers/payment-controller.interface';
import { GlobalResponse } from 'src/infrastructure/response/global-response';
import { paymentSwaggerConfig } from 'src/presentation/config/swagger/payment.swagger';
import { SetSwagger } from 'src/presentation/decorators/swagger.decorator';
import { PaymentRequestDto } from 'src/presentation/dtos/payment/payment-request.dto';

@Controller('payment')
export class PaymentController implements IPaymentController {
  @SetSwagger(paymentSwaggerConfig)
  @Post()
  async payment(dto: PaymentRequestDto) {
    return GlobalResponse.success({
      message: '결제에 성공했습니다.',
      statusCode: HttpStatus.CREATED,
      data: {
        orderId: '1234',
      },
    });
  }
}

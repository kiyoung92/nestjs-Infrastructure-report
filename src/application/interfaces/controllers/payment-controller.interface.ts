import { GlobalResponse } from 'src/infrastructure/response/global-response';
import { PaymentRequestDto } from 'src/presentation/dtos/payment/payment-request.dto';
import { PaymentResponseDto } from 'src/presentation/dtos/payment/payment-response.dto';

export interface IPaymentController {
  payment(dto: PaymentRequestDto): Promise<GlobalResponse<PaymentResponseDto>>;
}

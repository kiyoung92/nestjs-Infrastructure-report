import { GlobalResponse } from 'src/infrastructure/response/global-response';
import { OrderRequestDto } from 'src/presentation/dtos/order/order-request.dto';
import { OrderResponseDto } from 'src/presentation/dtos/order/order-response.dto';

export interface IOrderController {
  createOrder(dto: OrderRequestDto): Promise<GlobalResponse<OrderResponseDto>>;
}

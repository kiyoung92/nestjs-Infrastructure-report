import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { IOrderController } from 'src/application/interfaces/controllers/order-controller.interface';
import { GlobalResponse } from 'src/infrastructure/response/global-response';
import { orderSwaggerConfig } from 'src/presentation/config/swagger/order.swagger';
import { SetSwagger } from 'src/presentation/decorators/swagger.decorator';
import { OrderRequestDto } from 'src/presentation/dtos/order/order-request.dto';

@Controller('order')
export class OrderController implements IOrderController {
  @SetSwagger(orderSwaggerConfig)
  @Post('/create')
  async createOrder(@Body() dto: OrderRequestDto) {
    return GlobalResponse.success({
      statusCode: HttpStatus.CREATED,
      message: '주문이 성공적으로 생성되었습니다.',
      data: {
        orderId: '1',
        createdAt: '2021-01-01 00:00:00.111',
      },
    });
  }
}

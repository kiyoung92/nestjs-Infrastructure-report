import { ApiProperty } from '@nestjs/swagger';

type OrderRequestItem = {
  productId: number;
  count: number;
  price: number;
};

export class OrderRequestDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  orderItems: OrderRequestItem[];

  @ApiProperty()
  createdAt: string;
}

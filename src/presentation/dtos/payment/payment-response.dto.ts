import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PaymentResponseDto {
  @ApiProperty()
  @Expose()
  orderId: string;

  constructor(orderId: string) {
    this.orderId = orderId;
  }
}

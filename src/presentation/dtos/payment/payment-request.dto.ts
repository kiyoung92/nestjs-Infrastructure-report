import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PaymentRequestDto {
  @ApiProperty()
  @Expose()
  orderId: string;
}

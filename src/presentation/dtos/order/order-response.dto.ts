import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class OrderResponseDto {
  @ApiProperty()
  @Expose()
  orderId: string;

  @ApiProperty()
  @Expose()
  createdAt: string;

  constructor(orderId: string, createdAt: string) {
    this.orderId = orderId;
    this.createdAt = createdAt;
  }
}

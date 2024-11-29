import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PointResponseDto {
  @ApiProperty()
  @Expose()
  point: number;

  @ApiProperty()
  @Expose()
  updatedAt: string;

  constructor(point: number, updatedAt: string) {
    this.point = point;
    this.updatedAt = updatedAt;
  }
}

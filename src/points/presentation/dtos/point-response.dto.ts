import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class PointResponseDto {
  @Exclude()
  id: number;

  @Exclude()
  userId: number;

  @ApiProperty()
  @Expose()
  balance: number;

  @ApiProperty()
  @Expose()
  updatedAt: string;
}

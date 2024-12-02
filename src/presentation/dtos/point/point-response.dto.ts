import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class PointResponseDto {
  @Exclude()
  readonly id: number;

  @Exclude()
  readonly userId: number;

  @ApiProperty()
  @Expose()
  readonly point: number;

  @Exclude()
  readonly balance: number;

  @ApiProperty()
  @Expose()
  readonly updatedAt: string;
}

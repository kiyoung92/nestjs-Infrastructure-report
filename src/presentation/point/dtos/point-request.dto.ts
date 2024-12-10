import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class PointRequestDto {
  @ApiProperty()
  @Expose()
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @Expose()
  @IsInt({ message: '충전 포인트를 확인해 주세요.' })
  @IsNotEmpty({ message: '충전 포인트를 확인해 주세요.' })
  @IsPositive({ message: '충전 포인트를 확인해 주세요.' })
  point: number;
}

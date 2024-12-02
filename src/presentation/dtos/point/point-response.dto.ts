import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, plainToClass } from 'class-transformer';
import { Point } from 'src/domain/entities/point.entity';

export class PointResponseDto {
  @Exclude()
  private readonly _id: number;

  @Exclude()
  private readonly _userId: number;

  @Exclude()
  private readonly _point: number;

  @Exclude()
  private readonly _balance: number;

  @Exclude()
  private readonly _updatedAt: string;

  constructor(data: Partial<Point>) {
    Object.assign(this, plainToClass(Point, data));
  }

  @ApiProperty()
  @Expose()
  get point() {
    return this._point;
  }

  @ApiProperty()
  @Expose()
  get updatedAt() {
    return this._updatedAt;
  }
}

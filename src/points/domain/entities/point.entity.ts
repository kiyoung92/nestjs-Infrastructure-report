import { PointEntityConstructorParams } from 'src/points/domain/types/point.entity.type';

export class PointEntity {
  id: number;
  userId: number;
  point: number;
  updatedAt: string;

  constructor({ id, userId, point, updatedAt }: PointEntityConstructorParams) {
    this.id = id;
    this.userId = userId;
    this.point = point;
    this.updatedAt = updatedAt;
  }
}

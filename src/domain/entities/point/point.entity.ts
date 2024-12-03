import { PointEntityContructorParamsType } from 'src/domain/entities/point/types/point-entity.type';
import { getTimestamp } from 'src/domain/utils/dayjs.util';

export class Point {
  private readonly _id: number;
  private readonly _userId: number;
  private _point: number;
  private _updatedAt: string;

  constructor({
    id,
    userId,
    point,
    updatedAt,
  }: PointEntityContructorParamsType) {
    this._id = id;
    this._userId = userId;
    this._point = point;
    this._updatedAt = updatedAt;
  }

  chargePoint(setPoint: number) {
    const timestamp = getTimestamp();
    this._point += setPoint;
    this._updatedAt = timestamp;
  }

  get id(): number {
    return this._id;
  }

  get userId(): number {
    return this._userId;
  }

  get point(): number {
    return this._point;
  }

  get updatedAt(): string {
    return this._updatedAt;
  }
}

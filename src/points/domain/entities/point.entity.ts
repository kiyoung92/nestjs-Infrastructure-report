import { UnprocessableEntityException } from '@nestjs/common';
import { MAX_POINT } from 'src/points/domain/constants/point-entity.constant';
import {
  PointEntityConstructorParams,
  PointEntitySetPointParams,
} from 'src/points/domain/types/point.entity.type';

export class PointEntity {
  id: number;
  userId: number;
  balance: number;
  updatedAt: string;

  constructor({
    id,
    userId,
    balance,
    updatedAt,
  }: PointEntityConstructorParams) {
    this.id = id;
    this.userId = userId;
    this.balance = balance;
    this.updatedAt = updatedAt;
  }

  chagePoint({ point }: PointEntitySetPointParams): void {
    this.balance += point;

    if (MAX_POINT < this.balance) {
      throw new UnprocessableEntityException(
        '포인트가 최대치를 초과하였습니다.',
      );
    }
  }
}

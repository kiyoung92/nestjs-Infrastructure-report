import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { IPointHistoriesRepository } from 'src/domain/point/interfaces/point-histories-repository.interface';
import { PointHistoryCreateChargeHistoryParamsType } from 'src/domain/point/types/point-repository-history.type';
import { DRIZZLE_PROVIDER } from 'src/infrastructure/database/constants/constants';
import { pointHistories } from 'src/infrastructure/database/schemas/schema';
import { DrizzleORM } from 'src/infrastructure/database/types/drizzle';

@Injectable()
export class PointHistoriesRepository implements IPointHistoriesRepository {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    private readonly drizzle: DrizzleORM,
  ) {}
  async createChargeHistory({
    pointEntity,
    point,
    tx,
  }: PointHistoryCreateChargeHistoryParamsType) {
    try {
      await (tx || this.drizzle).insert(pointHistories).values({
        pointId: pointEntity.id,
        point: point,
        balance: pointEntity.point,
        useType: 'charge',
        createdAt: pointEntity.updatedAt,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        '포인트 히스토리 생성 중 오류가 발생했습니다.',
      );
    }
  }
}

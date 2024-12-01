import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { Point } from 'src/domain/entities/point.entity';
import { IPointRepository } from 'src/domain/interfaces/repositories/point.repository';
import { DRIZZLE_PROVIDER } from 'src/infrastructure/database/constants/constants';
import { point } from 'src/infrastructure/database/schemas/schema';
import {
  DrizzleORM,
  DrizzleTransaction,
} from 'src/infrastructure/database/types/drizzle';

@Injectable()
export class PointRepository implements IPointRepository {
  constructor(
    @Inject(DRIZZLE_PROVIDER)
    readonly drizzle: DrizzleORM,
  ) {}

  async find(userId: number, tx?: DrizzleTransaction) {
    try {
      const rows = await (tx || this.drizzle)
        .select()
        .from(point)
        .where(eq(point.userId, userId));

      return rows;
    } catch (error) {
      throw new InternalServerErrorException(
        '포인트 조회 중 오류가 발생했습니다.',
      );
    }
  }

  async setPoint(pointEntity: Point, tx?: DrizzleTransaction) {
    try {
      await (tx || this.drizzle)
        .update(point)
        .set({ point: pointEntity.point, updatedAt: pointEntity.updatedAt })
        .where(eq(point.userId, pointEntity.userId));
    } catch (error) {
      throw new InternalServerErrorException(
        '포인트 충전 중 오류가 발생했습니다.',
      );
    }
  }
}

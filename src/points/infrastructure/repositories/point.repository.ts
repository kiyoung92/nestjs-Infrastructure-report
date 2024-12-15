import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE_PROVIDER } from 'src/database/constants/constants';
import { points } from 'src/database/schemas/schemas';
import { DrizzleORM } from 'src/database/types/drizzle';
import { PointEntity } from 'src/points/domain/entities/point.entity';
import { IPointRepository } from 'src/points/domain/repositories/interfaces/point-repository.interface';
import {
  PointRepositoryChargeParams,
  PointRepositoryGetParams,
} from 'src/points/domain/types/point.repository.type';

@Injectable()
export class PointRepository implements IPointRepository {
  constructor(@Inject(DRIZZLE_PROVIDER) private readonly drizzle: DrizzleORM) {}
  async get({ userId, tx }: PointRepositoryGetParams) {
    try {
      const pointRepositoryResponse = await (tx || this.drizzle)
        .select()
        .from(points)
        .where(eq(points.userId, userId));

      return pointRepositoryResponse.length
        ? new PointEntity({
            id: pointRepositoryResponse[0].id,
            userId: pointRepositoryResponse[0].userId,
            point: pointRepositoryResponse[0].point,
            updatedAt: pointRepositoryResponse[0].updatedAt,
          })
        : null;
    } catch (error) {
      throw new InternalServerErrorException(
        '포인트 조회 중 오류가 발생하였습니다.',
      );
    }
  }

  async charge({ userId, point, tx }: PointRepositoryChargeParams) {
    try {
      await (tx || this.drizzle)
        .update(points)
        .set({
          point,
        })
        .where(eq(points.userId, userId));
    } catch (error) {
      throw new InternalServerErrorException(
        '포인트 충전 중 오류가 발생하였습니다.',
      );
    }
  }
}

import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { dayjsUtil } from 'src/common/utils/dayjs.util';
import { DRIZZLE_PROVIDER } from 'src/database/constants/constants';
import { pointHistories, points } from 'src/database/schemas/schemas';
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
  async findOne({ userId, tx }: PointRepositoryGetParams) {
    try {
      const pointRepositoryResponse = tx
        ? await tx
            .select()
            .from(points)
            .for('update')
            .where(eq(points.userId, userId))
        : await this.drizzle
            .select()
            .from(points)
            .where(eq(points.userId, userId));

      return pointRepositoryResponse.length
        ? new PointEntity({
            id: pointRepositoryResponse[0].id,
            userId: pointRepositoryResponse[0].userId,
            balance: pointRepositoryResponse[0].balance,
            updatedAt: pointRepositoryResponse[0].updatedAt,
          })
        : null;
    } catch (error) {
      throw new InternalServerErrorException('일시적인 오류가 발생하였습니다.');
    }
  }

  async setPoint({
    userId,
    pointId,
    point,
    balance,
    useType,
    tx,
  }: PointRepositoryChargeParams) {
    try {
      const updatedTimestamp = dayjsUtil.getTimestamp();
      await (tx || this.drizzle)
        .update(points)
        .set({
          balance,
          updatedAt: updatedTimestamp,
        })
        .where(eq(points.userId, userId));

      await (tx || this.drizzle).insert(pointHistories).values({
        pointId,
        point,
        balance,
        useType,
        createdAt: updatedTimestamp,
      });
    } catch (error) {
      throw new InternalServerErrorException('일시적인 오류가 발생하였습니다.');
    }
  }
}

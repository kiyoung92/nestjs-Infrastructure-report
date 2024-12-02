import { Point } from 'src/domain/entities/point.entity';
import { DrizzleTransaction } from 'src/infrastructure/database/types/drizzle';

export interface IPointHistoriesRepository {
  createChargeHistory: (
    pointEntity: Point,
    point: number,
    tx?: DrizzleTransaction,
  ) => Promise<void>;
}

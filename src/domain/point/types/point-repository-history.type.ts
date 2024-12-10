import { Point } from 'src/domain/point/entities/point.entity';
import { DrizzleTransaction } from 'src/infrastructure/database/types/drizzle';

export type PointHistoryCreateChargeHistoryParamsType = {
  pointEntity: Point;
  point: number;
  tx?: DrizzleTransaction;
};

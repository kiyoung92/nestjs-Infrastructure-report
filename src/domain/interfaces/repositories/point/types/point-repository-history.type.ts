import { Point } from 'src/domain/entities/point/point.entity';
import { DrizzleTransaction } from 'src/infrastructure/database/types/drizzle';

export type PointHistoryCreateChargeHistoryParamsType = {
  pointEntity: Point;
  point: number;
  tx?: DrizzleTransaction;
};

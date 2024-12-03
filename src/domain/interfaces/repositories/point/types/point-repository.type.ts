import { Point } from 'src/domain/entities/point/point.entity';
import { DrizzleTransaction } from 'src/infrastructure/database/types/drizzle';

export type PointRepositoryFindParamsType = {
  userId: number;
  tx?: DrizzleTransaction;
};

export type PointRepositorySetPointParamsType = {
  pointEntity: Point;
  tx?: DrizzleTransaction;
};

export type PointRepositoryReturnType = {
  id: number;
  userId: number;
  point: number;
  updatedAt: string;
};

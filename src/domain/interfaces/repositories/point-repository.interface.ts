import { Point } from 'src/domain/entities/point.entity';
import { DrizzleTransaction } from 'src/infrastructure/database/types/drizzle';

export type PointRepositoryReturnType = {
  id: number;
  userId: number;
  point: number;
  updatedAt: string;
};

export interface IPointRepository {
  find(
    userId: number,
    tx?: DrizzleTransaction,
  ): Promise<PointRepositoryReturnType[]>;
  setPoint(pointEntity: Point, tx?: DrizzleTransaction): Promise<void>;
}

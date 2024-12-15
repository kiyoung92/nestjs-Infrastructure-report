import { DrizzleTransaction } from 'src/database/types/drizzle';

export type PointRepositoryGetParams = {
  userId: number;
  tx?: DrizzleTransaction;
};

export type PointRepositoryChargeParams = {
  userId: number;
  point: number;
  tx?: DrizzleTransaction;
};

import { DrizzleTransaction } from 'src/database/types/drizzle';

export type PointRepositoryGetParams = {
  userId: number;
  tx?: DrizzleTransaction;
};

export type PointRepositoryChargeParams = {
  userId: number;
  pointId: number;
  point: number;
  balance: number;
  useType: 'charge' | 'use';
  tx?: DrizzleTransaction;
};

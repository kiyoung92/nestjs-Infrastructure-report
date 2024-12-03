import { PointHistoryCreateChargeHistoryParamsType } from 'src/domain/interfaces/repositories/point/types/point-repository-history.type';

export interface IPointHistoriesRepository {
  createChargeHistory: ({
    pointEntity,
    point,
    tx,
  }: PointHistoryCreateChargeHistoryParamsType) => Promise<void>;
}

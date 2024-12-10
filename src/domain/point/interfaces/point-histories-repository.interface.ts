import { PointHistoryCreateChargeHistoryParamsType } from 'src/domain/point/types/point-repository-history.type';

export interface IPointHistoriesRepository {
  createChargeHistory: ({
    pointEntity,
    point,
    tx,
  }: PointHistoryCreateChargeHistoryParamsType) => Promise<void>;
}

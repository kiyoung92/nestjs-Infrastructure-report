import { PointEntity } from 'src/points/domain/entities/point.entity';
import {
  PointRepositoryChargeParams,
  PointRepositoryGetParams,
} from 'src/points/domain/types/point.repository.type';

export interface IPointRepository {
  findOne({
    userId,
    tx,
  }: PointRepositoryGetParams): Promise<PointEntity | null>;
  setPoint({
    userId,
    pointId,
    point,
    balance,
    useType,
    tx,
  }: PointRepositoryChargeParams): Promise<void>;
}

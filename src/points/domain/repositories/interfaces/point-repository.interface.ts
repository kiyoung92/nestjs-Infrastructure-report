import { PointEntity } from 'src/points/domain/entities/point.entity';
import {
  PointRepositoryChargeParams,
  PointRepositoryGetParams,
} from 'src/points/domain/types/point.repository.type';

export interface IPointRepository {
  get({ userId, tx }: PointRepositoryGetParams): Promise<PointEntity | null>;
  charge({ userId, point, tx }: PointRepositoryChargeParams): Promise<void>;
}

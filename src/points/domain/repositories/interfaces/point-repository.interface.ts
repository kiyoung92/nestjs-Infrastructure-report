import { PointEntity } from 'src/points/domain/entities/point.entity';
import { PointRepositoryGetParams } from 'src/points/domain/types/point.repository.type';

export interface IPointRepository {
  get({ userId }: PointRepositoryGetParams): Promise<PointEntity>;
}

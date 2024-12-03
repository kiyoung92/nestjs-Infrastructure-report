import { Point } from 'src/domain/entities/point/point.entity';
import {
  PointServiceChargeParamsType,
  PointServiceFindEntityParamsType,
} from 'src/domain/interfaces/services/point/types/point-service.type';

export interface IPointService {
  findEntity({ pointRepositoryRows }: PointServiceFindEntityParamsType): Point;
  charge({ pointRepositoryRows, point }: PointServiceChargeParamsType): Point;
}

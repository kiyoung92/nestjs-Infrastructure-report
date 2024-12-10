import { Point } from 'src/domain/point/entities/point.entity';
import {
  PointServiceChargeParamsType,
  PointServiceFindEntityParamsType,
} from 'src/domain/point/types/point-service.type';

export interface IPointService {
  findEntity({ pointRepositoryRows }: PointServiceFindEntityParamsType): Point;
  charge({ pointRepositoryRows, point }: PointServiceChargeParamsType): Point;
}

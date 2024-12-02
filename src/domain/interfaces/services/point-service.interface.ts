import { Point } from 'src/domain/entities/point.entity';
import { PointRepositoryReturnType } from 'src/domain/interfaces/repositories/point-repository.interface';

export interface IPointService {
  findEntity(pointRepositoryRows: PointRepositoryReturnType[]): Point;
  charge(pointEntity: PointRepositoryReturnType[], point: number): Point;
}

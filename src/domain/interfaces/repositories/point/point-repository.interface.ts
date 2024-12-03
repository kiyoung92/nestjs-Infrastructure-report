import {
  PointRepositoryFindParamsType,
  PointRepositoryReturnType,
  PointRepositorySetPointParamsType,
} from 'src/domain/interfaces/repositories/point/types/point-repository.type';

export interface IPointRepository {
  find({
    userId,
    tx,
  }: PointRepositoryFindParamsType): Promise<PointRepositoryReturnType[]>;
  setPoint({
    pointEntity,
    tx,
  }: PointRepositorySetPointParamsType): Promise<void>;
}

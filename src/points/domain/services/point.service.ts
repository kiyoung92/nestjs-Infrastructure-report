import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { REPOSITORY_MANAGER } from 'src/database/constants/constants';
import { RepositoryManager } from 'src/database/managers/transaction.manager';
import { PointEntity } from 'src/points/domain/entities/point.entity';
import { POINT_REPOSITORY } from 'src/points/domain/repositories/constants/point-repository.constant';
import { IPointRepository } from 'src/points/domain/repositories/interfaces/point-repository.interface';
import {
  ChargePointServiceParams,
  PointServiceGetParams,
} from 'src/points/domain/types/point.service.type';

@Injectable()
export class PointService {
  constructor(
    @Inject(POINT_REPOSITORY)
    private readonly pointRepository: IPointRepository,
    @Inject(REPOSITORY_MANAGER)
    private readonly repositoryManager: RepositoryManager,
  ) {}

  async get({ userId }: PointServiceGetParams): Promise<PointEntity> {
    const pointEntity = await this.pointRepository.get({ userId });

    if (!pointEntity) {
      throw new NotFoundException('사용자 정보가 없습니다.');
    }

    return pointEntity;
  }

  async charge({
    userId,
    point,
  }: ChargePointServiceParams): Promise<PointEntity> {
    return await this.repositoryManager.transaction(async (tx) => {
      const pointEntity = await this.pointRepository.get({ userId, tx });

      if (!pointEntity) {
        throw new NotFoundException('사용자 정보가 없습니다.');
      }

      pointEntity.chagePoint({ point });
      await this.pointRepository.charge({
        userId,
        point: pointEntity.point,
        tx,
      });

      return pointEntity;
    });
  }
}

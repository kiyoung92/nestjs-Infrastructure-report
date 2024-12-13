import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PointEntity } from 'src/points/domain/entities/point.entity';
import { POINT_REPOSITORY } from 'src/points/domain/repositories/constants/point-repository.constant';
import { IPointRepository } from 'src/points/domain/repositories/interfaces/point-repository.interface';
import { PointServiceGetParams } from 'src/points/domain/types/point.service.type';

@Injectable()
export class PointService {
  constructor(
    @Inject(POINT_REPOSITORY)
    private readonly pointRepository: IPointRepository,
  ) {}

  async get({ userId }: PointServiceGetParams): Promise<PointEntity> {
    const pointEntity = await this.pointRepository.get({ userId });

    if (!pointEntity) {
      throw new NotFoundException('사용자 정보가 없습니다.');
    }

    return pointEntity;
  }
}

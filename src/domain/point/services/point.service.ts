import { Injectable, NotFoundException } from '@nestjs/common';
import { Point } from 'src/domain/point/entities/point.entity';
import { IPointService } from 'src/domain/point/interfaces/point-service.interface';
import {
  PointServiceChargeParamsType,
  PointServiceFindEntityParamsType,
} from 'src/domain/point/types/point-service.type';

@Injectable()
export class PointService implements IPointService {
  findEntity({ pointRepositoryRows }: PointServiceFindEntityParamsType) {
    if (!pointRepositoryRows.length) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const entity = new Point({
      id: pointRepositoryRows[0].id,
      userId: pointRepositoryRows[0].userId,
      point: pointRepositoryRows[0].point,
      updatedAt: pointRepositoryRows[0].updatedAt,
    });

    return entity;
  }

  charge({ pointRepositoryRows, point }: PointServiceChargeParamsType) {
    const entity = this.findEntity({ pointRepositoryRows });

    entity.chargePoint(point);

    return entity;
  }
}

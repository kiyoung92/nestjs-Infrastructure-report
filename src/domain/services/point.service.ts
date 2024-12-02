import { Injectable, NotFoundException } from '@nestjs/common';
import { Point } from 'src/domain/entities/point.entity';
import { PointRepositoryReturnType } from 'src/domain/interfaces/repositories/point-repository.interface';
import { IPointService } from 'src/domain/interfaces/services/point-service.interface';

@Injectable()
export class PointService implements IPointService {
  findEntity(pointRepositoryRows: PointRepositoryReturnType[]) {
    if (!pointRepositoryRows.length) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const entity = new Point(
      pointRepositoryRows[0].id,
      pointRepositoryRows[0].userId,
      pointRepositoryRows[0].point,
      pointRepositoryRows[0].updatedAt,
    );

    return entity;
  }

  charge(pointEntites: PointRepositoryReturnType[], point: number) {
    const entity = this.findEntity(pointEntites);

    entity.chargePoint(point);

    return entity;
  }
}

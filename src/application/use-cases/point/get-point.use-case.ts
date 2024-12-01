import { Injectable } from '@nestjs/common';
import { Point } from 'src/domain/entities/point.entity';
import { PointService } from 'src/domain/services/point.service';
import { PointRepository } from 'src/infrastructure/repositories/point.repository';

@Injectable()
export class GetPointUseCase {
  constructor(
    private readonly pointService: PointService,
    private readonly pointRepository: PointRepository,
  ) {}
  async execute({ userId }: { userId: number }): Promise<Point> {
    const pointEntities = await this.pointRepository.find(userId);

    return this.pointService.findEntity(pointEntities);
  }
}

import { Injectable } from '@nestjs/common';
import { GetPointUseCaseParamsType } from 'src/application/point/types/get-point-use-case.type';
import { Point } from 'src/domain/point/entities/point.entity';
import { PointService } from 'src/domain/point/services/point.service';
import { PointRepository } from 'src/infrastructure/point/repositories/point.repository';

@Injectable()
export class GetPointUseCase {
  constructor(
    private readonly pointService: PointService,
    private readonly pointRepository: PointRepository,
  ) {}
  async execute({ userId }: GetPointUseCaseParamsType): Promise<Point> {
    const pointRepositoryRows = await this.pointRepository.find({ userId });

    return this.pointService.findEntity({ pointRepositoryRows });
  }
}

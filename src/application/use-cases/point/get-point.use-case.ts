import { Injectable } from '@nestjs/common';
import { GetPointUseCaseParamsType } from 'src/application/use-cases/point/types/get-point-use-case.type';
import { Point } from 'src/domain/entities/point/point.entity';
import { PointService } from 'src/domain/services/point/point.service';
import { PointRepository } from 'src/infrastructure/repositories/point/point.repository';

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

import { Injectable } from '@nestjs/common';
import { GetPointUseCaseParams } from 'src/points/application/types/get-point.use-case.type';
import { PointEntity } from 'src/points/domain/entities/point.entity';
import { PointService } from 'src/points/domain/services/point.service';

@Injectable()
export class GetPointUseCase {
  constructor(private readonly pointService: PointService) {}

  async execute({ userId }: GetPointUseCaseParams): Promise<PointEntity> {
    return await this.pointService.get({ userId });
  }
}

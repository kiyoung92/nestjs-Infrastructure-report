import { Injectable } from '@nestjs/common';
import { ChargePointUseCaseParams } from 'src/points/application/types/charge-point.use-case.type';
import { PointEntity } from 'src/points/domain/entities/point.entity';
import { PointService } from 'src/points/domain/services/point.service';

@Injectable()
export class ChargePointUseCase {
  constructor(private readonly pointService: PointService) {}
  async execute({
    userId,
    point,
  }: ChargePointUseCaseParams): Promise<PointEntity> {
    return await this.pointService.charge({ userId, point });
  }
}

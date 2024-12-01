import { Injectable } from '@nestjs/common';
import { Point } from 'src/domain/entities/point.entity';
import { PointService } from 'src/domain/services/point.service';
import { TransactionManager } from 'src/infrastructure/managers/transaction.manager';
import { PointRepository } from 'src/infrastructure/repositories/point.repository';

@Injectable()
export class ChargePointUseCase {
  constructor(
    private readonly pointService: PointService,
    private readonly pointRepository: PointRepository,
    private readonly transactionManager: TransactionManager,
  ) {}

  async execute({
    userId,
    point,
  }: {
    userId: number;
    point: number;
  }): Promise<Point> {
    return await this.transactionManager.transaction(async (tx) => {
      const pointRows = await this.pointRepository.find(userId, tx);
      const pointEntity = this.pointService.charge(pointRows, point);

      await this.pointRepository.setPoint(pointEntity, tx);

      return pointEntity;
    });
  }
}

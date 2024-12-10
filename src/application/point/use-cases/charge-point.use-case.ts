import { Injectable } from '@nestjs/common';
import { ChargePointUseCaseParamsType } from 'src/application/point/types/charge-point-use-case.type';
import { Point } from 'src/domain/point/entities/point.entity';
import { PointService } from 'src/domain/point/services/point.service';
import { TransactionManager } from 'src/infrastructure/managers/transaction.manager';
import { PointRepository } from 'src/infrastructure/point/repositories/point.repository';
import { PointHistoriesRepository } from 'src/infrastructure/point/repositories/point-history.repository';

@Injectable()
export class ChargePointUseCase {
  constructor(
    private readonly pointService: PointService,
    private readonly pointRepository: PointRepository,
    private readonly transactionManager: TransactionManager,
    private readonly pointHistoriesRepository: PointHistoriesRepository,
  ) {}

  async execute({
    userId,
    point,
  }: ChargePointUseCaseParamsType): Promise<Point> {
    return await this.transactionManager.transaction(async (tx) => {
      const pointRepositoryRows = await this.pointRepository.find({
        userId,
        tx,
      });
      const pointEntity = this.pointService.charge({
        point,
        pointRepositoryRows,
      });

      await this.pointRepository.setPoint({ pointEntity, tx });
      await this.pointHistoriesRepository.createChargeHistory({
        pointEntity,
        point,
        tx,
      });

      return pointEntity;
    });
  }
}

import { Module } from '@nestjs/common';
import { ChargePointUseCase } from 'src/points/application/use-cases/charge-point.use-case';
import { GetPointUseCase } from 'src/points/application/use-cases/get-point.use-case';
import { PointDomainModule } from 'src/points/domain/point-domain.module';

@Module({
  imports: [PointDomainModule],
  providers: [GetPointUseCase, ChargePointUseCase],
  exports: [GetPointUseCase, ChargePointUseCase],
})
export class PointApplicationModule {}

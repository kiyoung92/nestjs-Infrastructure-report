import { Module } from '@nestjs/common';
import { GetPointUseCase } from 'src/points/application/use-cases/get-point.use-case';
import { PointDomainModule } from 'src/points/domain/point-domain.module';

@Module({
  imports: [PointDomainModule],
  providers: [GetPointUseCase],
  exports: [GetPointUseCase],
})
export class PointApplicationModule {}

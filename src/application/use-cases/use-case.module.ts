import { Module } from '@nestjs/common';
import { ChargePointUseCase } from 'src/application/use-cases/point/charge-point.use-case';
import { GetPointUseCase } from 'src/application/use-cases/point/get-point.use-case';
import { DomainModule } from 'src/domain/domain.module';
import { RepositoryModule } from 'src/infrastructure/repository.module';

@Module({
  imports: [DomainModule, RepositoryModule],
  providers: [ChargePointUseCase, GetPointUseCase],
  exports: [ChargePointUseCase, GetPointUseCase],
})
export class UseCaseModule {}

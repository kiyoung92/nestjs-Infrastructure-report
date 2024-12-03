import { Module } from '@nestjs/common';
import { ChargePointUseCase } from 'src/application/use-cases/point/charge-point.use-case';
import { GetPointUseCase } from 'src/application/use-cases/point/get-point.use-case';
import { ProductFindManyUseCase } from 'src/application/use-cases/product/product-find-many.use-case';
import { ProductFindTopSalesUseCase } from 'src/application/use-cases/product/product-find-top-sales.use-case';
import { DomainModule } from 'src/domain/domain.module';
import { RepositoryModule } from 'src/infrastructure/repository.module';

@Module({
  imports: [DomainModule, RepositoryModule],
  providers: [
    ChargePointUseCase,
    GetPointUseCase,
    ProductFindManyUseCase,
    ProductFindTopSalesUseCase,
  ],
  exports: [
    ChargePointUseCase,
    GetPointUseCase,
    ProductFindManyUseCase,
    ProductFindTopSalesUseCase,
  ],
})
export class UseCaseModule {}

import { Module } from '@nestjs/common';
import { ChargePointUseCase } from 'src/application/point/use-cases/charge-point.use-case';
import { GetPointUseCase } from 'src/application/point/use-cases/get-point.use-case';
import { ProductFindManyUseCase } from 'src/application/product/use-cases/product-find-many.use-case';
import { ProductFindTopSalesUseCase } from 'src/application/product/use-cases/product-find-top-sales.use-case';
import { DomainModule } from 'src/domain/domain.module';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

@Module({
  // TODO:
  imports: [DomainModule, InfrastructureModule],
  providers: [
    GetPointUseCase,
    ChargePointUseCase,
    ProductFindManyUseCase,
    ProductFindTopSalesUseCase,
  ],
  exports: [
    GetPointUseCase,
    ChargePointUseCase,
    ProductFindManyUseCase,
    ProductFindTopSalesUseCase,
  ],
})
export class ApplicationModule {}

import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/infrastructure/database/drizzle.module';
import { TransactionManager } from 'src/infrastructure/managers/transaction.manager';
import { PointRepository } from 'src/infrastructure/point/repositories/point.repository';
import { PointHistoriesRepository } from 'src/infrastructure/point/repositories/point-history.repository';
import { ProductRepository } from 'src/infrastructure/product/repositories/product.repository';

@Module({
  imports: [DrizzleModule],
  providers: [
    TransactionManager,
    PointRepository,
    PointHistoriesRepository,
    ProductRepository,
  ],
  exports: [
    TransactionManager,
    PointRepository,
    PointHistoriesRepository,
    ProductRepository,
  ],
})
export class InfrastructureModule {}

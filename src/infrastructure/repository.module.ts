import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/infrastructure/database/drizzle.module';
import { TransactionManager } from 'src/infrastructure/managers/transaction.manager';
import { PointRepository } from 'src/infrastructure/repositories/point.repository';
import { PointHistoriesRepository } from 'src/infrastructure/repositories/point-history.repository';

@Module({
  imports: [DrizzleModule],
  providers: [TransactionManager, PointRepository, PointHistoriesRepository],
  exports: [TransactionManager, PointRepository, PointHistoriesRepository],
})
export class RepositoryModule {}

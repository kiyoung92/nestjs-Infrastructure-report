import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/infrastructure/database/drizzle.module';
import { TransactionManager } from 'src/infrastructure/managers/transaction.manager';
import { PointRepository } from 'src/infrastructure/repositories/point.repository';

@Module({
  imports: [DrizzleModule],
  providers: [TransactionManager, PointRepository],
  exports: [TransactionManager, PointRepository],
})
export class RepositoryModule {}

import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/infrastructure/database/drizzle.module';
import { RepositoryManager } from 'src/infrastructure/managers/transaction.manager';

@Module({
  imports: [DrizzleModule],
  providers: [RepositoryManager],
  exports: [RepositoryManager],
})
export class InfrastructureModule {}

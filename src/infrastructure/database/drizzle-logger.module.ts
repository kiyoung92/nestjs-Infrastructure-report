import { Module } from '@nestjs/common';
import { CustomLoggerModule } from 'src/application/config/logger/custom-logger.module';
import { DrizzleLoggerService } from 'src/infrastructure/database/drizzle-logger.service';

@Module({
  imports: [CustomLoggerModule],
  providers: [DrizzleLoggerService],
  exports: [DrizzleLoggerService],
})
export class DrizzleLoggerModule {}

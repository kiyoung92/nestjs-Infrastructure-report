import { Module } from '@nestjs/common';
import { CustomLoggerService } from 'src/common/global-config/logger/custom-logger.service';
import { DrizzleLoggerService } from 'src/infrastructure/database/drizzle-logger.service';

@Module({
  providers: [DrizzleLoggerService, CustomLoggerService],
  exports: [DrizzleLoggerService],
})
export class DrizzleLoggerModule {}

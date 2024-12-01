import { Module } from '@nestjs/common';
import { CustomLoggerService } from 'src/application/config/logger/custom-logger.service';

@Module({
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class CustomLoggerModule {}

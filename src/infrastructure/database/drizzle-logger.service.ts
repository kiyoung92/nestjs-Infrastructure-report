import { Injectable } from '@nestjs/common';
import { Logger } from 'drizzle-orm';
import { CustomLoggerService } from 'src/application/config/logger/custom-logger.service';

@Injectable()
export class DrizzleLoggerService implements Logger {
  constructor(private readonly logger: CustomLoggerService) {}
  logQuery(query: string, params: unknown[]): void {
    this.logger.drizzle(query, ...params);
  }
}

import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICustomLoggerService } from 'src/infrastructure/interfaces/custom-logger.interface';

@Injectable()
export class CustomLoggerService
  extends ConsoleLogger
  implements ICustomLoggerService
{
  constructor(private readonly configService: ConfigService) {
    super();
  }

  log(message: any, context?: string): void {
    super.log(message, context);
  }
  verbose(message: any, context?: string): void {
    super.verbose(message, context);
  }
  warn(message: any, context?: string): void {
    super.warn(message, context);
  }
  debug(message: any, context?: string): void {
    super.debug(message, context);
  }
  error(message: any, stack?: string, context?: string): void {
    super.error(message, stack, context);
  }
  database(message: any, ...optionalParams: [...any, string?]): void {
    if (this.configService.get('NODE_ENV') === 'development') {
      super.log(`\x1b[34m[Database] ${message}`, ...optionalParams);
    }
  }
  drizzle(message: any, ...optionalParams: [...any, string?]): void {
    if (this.configService.get('NODE_ENV') === 'development') {
      super.log(`\x1b[34m[ORM] ${message}`);
      if (optionalParams && optionalParams.length > 0) {
        super.log(`\x1b[34m[PARAMS] ${optionalParams.toString()}`);
      }
    }
  }
}

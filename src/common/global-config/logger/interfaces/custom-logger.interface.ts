export interface ICustomLoggerService {
  log(message: any, context?: string): void;
  verbose(message: any, context?: string): void;
  warn(message: any, context?: string): void;
  debug(message: any, context?: string): void;
  error(message: any, stack?: string, context?: string): void;
  database(message: any, ...optionalParams: [...any, string?]): void;
  drizzle(message: any, ...optionalParams: [...any, string?]): void;
}

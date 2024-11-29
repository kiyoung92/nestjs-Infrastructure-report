import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppConfigModule } from 'src/config/config.module';
import { DrizzleModule } from 'src/infrastructure/database/drizzle.module';
import { GlobalExceptionFilter } from 'src/infrastructure/filter/global-exception.filter';
import { CustomLoggerModule } from 'src/infrastructure/logger/custom-logger.module';
import { PresentationModule } from 'src/presentation/presentation.module';

@Module({
  imports: [
    AppConfigModule,
    CustomLoggerModule,
    DrizzleModule,
    PresentationModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}

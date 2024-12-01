import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppConfigModule } from 'src/application/config/config.module';
import { GlobalExceptionFilter } from 'src/application/config/filter/global-exception.filter';
import { CustomLoggerModule } from 'src/application/config/logger/custom-logger.module';
import { PresentationModule } from 'src/presentation/presentation.module';

@Module({
  imports: [AppConfigModule, CustomLoggerModule, PresentationModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}

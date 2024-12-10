import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from 'src/common/global-config/filters/global-exception-filter/global-exception.filter';
import { joiConfig } from 'src/common/global-config/joi/joi.config';
import { CustomLoggerService } from 'src/common/global-config/logger/custom-logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        process.env.NODE_ENV === 'development'
          ? './environment/.env.development'
          : './environment/.env.production',
      ],
      validationSchema: joiConfig,
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    CustomLoggerService,
  ],
})
export class CommonModule {}

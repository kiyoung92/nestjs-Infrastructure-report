import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { AppConfig, appOptions } from 'src/common/global-config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, appOptions);
  await AppConfig.beforeAll(app);
}
bootstrap();

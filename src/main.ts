import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/application/app.module';
import { AppConfig, appOptions } from 'src/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, appOptions);
  await AppConfig.beforeAll(app);
}
bootstrap();

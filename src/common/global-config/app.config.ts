import {
  ClassSerializerInterceptor,
  INestApplication,
  NestApplicationOptions,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

export class AppConfig {
  public static async beforeAll(app: INestApplication) {
    const appType = getBootstrapConfig('NODE_ENV');
    const corsOrigin = getBootstrapConfig('CORS_ORIGIN');
    const apiVersion = getBootstrapConfig('API_VERSION');
    const port = getBootstrapConfig('PORT');

    if (appType === 'development') {
      const swaggerConfig = new DocumentBuilder()
        .setTitle(getBootstrapConfig('OPENAPI_TITLE'))
        .setDescription(getBootstrapConfig('OPENAPI_DESCRIPTION'))
        .setVersion(apiVersion)
        .build();

      const documentFactory = () =>
        SwaggerModule.createDocument(app, swaggerConfig);
      SwaggerModule.setup('api', app, documentFactory);
    }

    app.useGlobalInterceptors(
      new ClassSerializerInterceptor(app.get(Reflector)),
    );
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.use(cookieParser());
    app.enableCors({
      origin: corsOrigin,
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    });
    app.setGlobalPrefix(apiVersion);

    await app.listen(port);
  }
}

export function getBootstrapConfig(key: string): string {
  const env = process.env[key];

  if (!env) {
    throw new Error(`환경변수 ${key}(이)가 존재하지 않습니다.`);
  }

  return env;
}

export const appOptions: NestApplicationOptions =
  getBootstrapConfig('NODE_ENV') === 'development'
    ? {
        logger: ['log', 'error', 'warn', 'debug', 'verbose'],
      }
    : {
        logger: ['error', 'warn'],
      };

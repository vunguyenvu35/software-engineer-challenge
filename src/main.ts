import { Logger as NestLogger } from '@nestjs/common';
import { useContainer } from 'class-validator';
import * as dotenv from 'dotenv';

import { swaggerConfig } from './configs';
import { AllExceptionsFilter, ValidationFilter } from './exceptions';
import {
  ClassSerializerInterceptor,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  // init application
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  // cors configs
  app.enableCors();

  // validate pipe global
  app.useGlobalPipes(
    new ValidationFilter({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
      transformOptions: {
        enableImplicitConversion: true,
      },
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // interceptor global
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // exception filters
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  // validation request
  app.useGlobalPipes(new ValidationPipe());

  // // setup swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3000);
  return app.getUrl();
}

(async (): Promise<void> => {
  try {
    const url = await bootstrap();
    NestLogger.log(url, 'Bootstrap');
  } catch (error) {
    NestLogger.error(error, 'Bootstrap');
  }
})();

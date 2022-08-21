import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    stopAtFirstError: true,
    whitelist: true
  }));
  app.enableCors({
    exposedHeaders: 'CartId, Cartid, cartId'
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

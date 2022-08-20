import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.useGlobalPipes(new ValidationPipe({
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
    stopAtFirstError: true,
    whitelist: true
  }));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

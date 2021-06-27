import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import { join } from 'path';
const express = require('express');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .setTitle('Szakdolgozati követőrendszer')
    .setDescription('Szakdolgozati követőrendszer backend API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(3001);
}
bootstrap();

import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'node:fs';
import * as process from 'node:process';
import { AppModule } from './app.module';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Backend API')
    .setVersion('1.0')
    .addServer('localhost/api')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  fs.writeFileSync('../frontend/openapi/backend.json', JSON.stringify(document), {});
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'local') {
    setupSwagger(app);
  }
  await app.listen(8080);
}
bootstrap();

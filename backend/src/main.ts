import { runMigrations } from '@db/migrate';
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
    .addServer('http://localhost/api')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Write openapi spec to frontend folder, so we can use it for code generation
  fs.writeFileSync('../frontend/openapi/backend.json', JSON.stringify(document), {});
  SwaggerModule.setup('swagger', app, document);
}

async function bootstrap() {
  await runMigrations();

  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'LOCAL') {
    setupSwagger(app);
  }
  app.enableShutdownHooks();

  await app.listen(8080);
}
bootstrap();

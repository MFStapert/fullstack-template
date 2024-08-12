import { schema } from '@db/schema';
import { seed } from '@db/seed';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import * as fs from 'node:fs';
import * as process from 'node:process';
import postgres from 'postgres';
import { AppModule } from './app.module';

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Backend API')
    .setVersion('1.0')
    .addServer('http://localhost/api')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Write openapi spec to frontend folder, so we can use it for code generation
  if (process.env.NODE_ENV === 'LOCAL') {
    fs.writeFileSync('../frontend/openapi/backend.json', JSON.stringify(document), {});
  }
  SwaggerModule.setup('swagger', app, document);
}

async function runMigrations() {
  console.log('Running migrations...');
  const sql = postgres(process.env.DATABASE_URL, { max: 1 });
  const db = drizzle<typeof schema>(sql);
  await migrate(db, { migrationsFolder: './migrations' });
  await seed(db);
  await sql.end();
  console.log('Finished running migrations...');
}

async function bootstrap() {
  await runMigrations();

  const app = await NestFactory.create(AppModule);
  setupSwagger(app);
  app.enableShutdownHooks();

  await app.listen(8080);
}
bootstrap();

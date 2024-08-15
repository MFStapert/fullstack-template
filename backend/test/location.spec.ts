import { INestApplication } from '@nestjs/common';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql/build/postgresql-container';
import request from 'supertest';
import { LocationsModule } from '../src/locations/locations.module';
import { createTestingModule } from './shared/test-database.module';

describe('location e2e', () => {
  let app: INestApplication;
  let postgresContainer: StartedPostgreSqlContainer;

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start();
    const moduleFixture = await createTestingModule(postgresContainer, [LocationsModule]);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await postgresContainer.stop();
  });

  it('/locations (GET)', () => {
    return request(app.getHttpServer())
      .get('/locations')
      .expect(200)
      .expect([{ id: 1, title: 'Ijssel' }]);
  });
});

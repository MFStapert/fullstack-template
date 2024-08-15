import { INestApplication } from '@nestjs/common';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql/build/postgresql-container';
import request from 'supertest';
import { LocationModule } from '../src/location/location.module';
import { createTestingModule } from './shared/test-database.module';

describe('locations e2e', () => {
  let app: INestApplication;
  let postgresContainer: StartedPostgreSqlContainer;

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start();
    const moduleFixture = await createTestingModule(postgresContainer, [LocationModule]);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await postgresContainer.stop();
  });

  it('(GET) /locations', () => {
    return request(app.getHttpServer())
      .get('/locations')
      .expect(200)
      .expect([{ id: 1, title: 'Ijssel' }]);
  });
});

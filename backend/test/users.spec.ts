import { INestApplication } from '@nestjs/common';
import { PostgreSqlContainer } from '@testcontainers/postgresql';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql/build/postgresql-container';
import request from 'supertest';
import { UserModule } from '../src/user/user.module';
import { createTestingModule } from './shared/test-database.module';

describe('users e2e', () => {
  let app: INestApplication;
  let postgresContainer: StartedPostgreSqlContainer;

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start();
    const moduleFixture = await createTestingModule(postgresContainer, [UserModule]);
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await postgresContainer.stop();
  });

  it('(GET) /users', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([
        { id: 1, name: 'Marijn' },
        { id: 2, name: 'Yorick' },
      ]);
  });

  it('(GET) /users/1', () => {
    return request(app.getHttpServer())
      .get('/users/1')
      .expect(200)
      .expect({ id: 1, name: 'Marijn' });
  });
});
